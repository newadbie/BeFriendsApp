import express from "express";
import isLogged from "../middlewares/isLogged";
import UserService from "../services/UserService";
import TokenService from "../services/JwtService";
import { joiRegisterSchema, joiLoginSchema } from "../models/user";

class Authorization {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post("/register", isLogged, this.signUp);
    this.router.post("/login", isLogged, this.signIn);
    this.router.post("/logout", this.signOut);
    this.router.post("/checkLogin", isLogged, this.checkLogin);
  }

  checkLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.locals.user) {
      console.log(res.locals.user);
      return res
        .status(200)
        .json({ isLogged: true, userEmail: res.locals.user.email, userName: res.locals.user.name });
    } else {
      return res
        .status(200)
        .json({ isLogged: false, message: "User is not logged" });
    }
  };

  signUp = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.locals.user) {
      return res
        .status(401)
        .json({ message: "You cannot register, if you are logged in!" });
    }

    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.message });
    }

    const { email, name, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords does not matches!" });
    }

    try {
      await UserService.createNewUser(email, password, name);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
    return res.status(200).json({ message: "Yaa, everything is correct!" });
  };

  signIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.locals.user) {
      return res
        .status(401)
        .json({ message: "Logged user cannot log in again!" });
    }

    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      return res.status(422).json(error.message);
    }
    const { email, password } = req.body;

    try {
      const loggedUser = await UserService.signInUser(email, password);
      const jwtToken = TokenService.generateJwtToken(loggedUser);

      return res
        .cookie("token", jwtToken, {
          maxAge: 30000000,
          httpOnly: true,
        })
        .json({
          message: "Everything is correct! You are logged in!",
        })
        .status(200);
    } catch (err) {
      return res.status(401).json(err.message);
    }
  };

  signOut = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "You have signed out!" });
  };

  public getRouter() {
    return this.router;
  }
}
export default Authorization;

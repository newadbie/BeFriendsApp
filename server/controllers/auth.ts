import express from "express";
import { IUser } from "../models/user";
import isLogged from "../middlewares/isLogged";
import UserService from "../services/UserService";

class Authorization {
  private readonly router: express.Router;
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.router = express.Router();
    this.initializeRouter();
    this.userService = userService;
  }

  signUp = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(422).json({message: "Passwords does not matches!"});
    }
    try {
        await this.userService.createNewUser(email, password);
    } catch (err) {
        res.status(422).json({message: err.message})
    }
    return res.status(200).json({ message: "Yaa, everything is correct!" });
  };

  private initializeRouter() {
    this.router.post("/register", isLogged, this.signUp);
  }

  public getRouter() {
    return this.router;
  }
}
export default Authorization;

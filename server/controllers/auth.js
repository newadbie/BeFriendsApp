const userRegisterJoi = require("../models/user").userRegisterJoi;
const userLoginJoi = require("../models/user").userLoginJoi;
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");

const secret = require("../secret");
const { getUserIfPasswordIsCorrect } = require("../services/UserService");

exports.postSignUp = async (req, res, next) => {
  if (req.user) {
    return res.status(401).json({ message: "Logged users cannot register!" });
  }

  const { error } = userRegisterJoi.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.message });
  }

  const userMail = req.body.email;
  const userPassword = req.body.password;
  
  await UserService.createNewUser(userMail, userPassword)
    .then(() => {
      return res
        .status(200)
        .json({ message: "User has been created sucessfully!" });
    })
    .catch((err) => {
      return res.status(422).json({ message: err.message });
    });
};

exports.postSignIn = async (req, res, next) => {
  if (req.user) {
    return res
      .status(401)
      .json({ message: "Logged users cannot log in again!" });
  }
  const { error } = userLoginJoi.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  try {
    const user = await getUserIfPasswordIsCorrect(req.body.password, req.body.email);
    const jwtToken = jwt.sign(
      { userId: user._id, logoutKey: user.logoutFromAllDevicesKey },
      secret.jwtSecret,
      {
        expiresIn: 60 * 60,
      }
    );
  
    return res
      .status(200)
      .cookie("token", jwtToken, {
        maxAge: 30000000,
        httpOnly: true,
      })
      .json({
        message: "Everything is correct! You are logged in!",
      });
  } catch(err) {
    return res.status(401).json({ message: err.message });
  }
  
};

exports.postGetLoggedUser = (req, res, next) => {
  return res.status(200).json({ userEmail: req.user.email });
};

exports.postSignOut = async (req, res, next) => {
  return res.clearCookie("token").status(200).json({ message: "OK" });
};

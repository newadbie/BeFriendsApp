const userRegisterJoi = require("../models/user").userRegisterJoi;
const userLoginJoi = require("../models/user").userLoginJoi;
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const secret = require("../secret");

exports.postSignUp = async (req, res, next) => {
  userRegisterJoi
    .validateAsync(req.body)
    .then((validateResult) => {
      const userMail = req.body.email;
      const userPassword = req.body.password;

      UserService.createNewUser(userMail, userPassword)
        .then(() => {
          return res
            .status(200)
            .json({ message: "User has been created sucessfully!" });
        })
        .catch((err) => {
          return res.status(422).json({ message: err.message });
        });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.postSignIn = async (req, res, next) => {
  userLoginJoi
    .validateAsync(req.body)
    .then((result) => {
      return UserService.isPasswordCorrect(req.body.password, req.body.email);
    })
    .then((data) => {
      if (data.isPasswordCorrect) {
        const jwtToken = jwt.sign({ id: data.user._id }, secret.jwtSecret, {
          expiresIn: 3600,
        });
        return res
          .status(200)
          .json({
            message: "Everything is correct! You are logged in!",
            accessToken: jwtToken,
          });
      } else {
        return res
          .status(401)
          .json({ message: "Email or password is incorrect!" });
      }
    })
    .catch((err) => {
      return res.status(422).json({ message: err.message });
    });
};


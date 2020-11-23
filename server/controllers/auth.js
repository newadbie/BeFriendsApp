const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const UserService = require("../services/UserService");

exports.postSignIn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userMail = req.body.email;
  const userPassword = req.body.password;

  UserService.createNewUser(userMail, userPassword)
    .then(() => {
      return res
        .status(200)
        .json({ message: "User has been created sucessfully!" });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(422)
        .json({ message: err.message });
    });
};

const { validationResult } = require("express-validator");
const Joi = require("joi");
const userJoi = require("../models/user").userJoi;
const UserService = require("../services/UserService");

exports.postSignIn = async (req, res, next) => {
  try {
    await userJoi.validateAsync(req.body);
    const userMail = req.body.email;
    const userPassword = req.body.password;

    UserService.createNewUser(userMail, userPassword)
      .then(() => {
        return res
          .status(200)
          .json({ message: "User has been created sucessfully!" });
      })
      .catch((err) => {
        return res.status(422).json({ message: "User is not created" });
      });
  } catch (err) {
    return res.status(400).json({ message: "Not valid inputs" });
  }
};

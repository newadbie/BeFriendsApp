const User = require("../models/user");
const { validationResult } = require("express-validator");
exports.postSignIn = (req, res, next) => {
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

  const userMail = req.body.email;
  const userPassword = req.body.password;

  const newUser = new User({
    email: userMail,
    password: userPassword,
  });

  return newUser
    .save()
    .then(() => res.status(200).json({ message: "Correct" }))
    .catch((err) => {
      console.log(err);
      res.status(422).json({ message: "Opus something went wrong! Try again" });
    });
};

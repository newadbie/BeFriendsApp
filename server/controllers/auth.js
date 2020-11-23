const User = require("../models/user");

exports.postSignIn = (req, res, next) => {
  const userMail = req.body.email;
  const userPassword = req.body.password;

  if (!userMail || !userPassword) {
    return res.status(422).json({ message: "Incorrect password or email" });
  }

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

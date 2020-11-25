const userJoi = require("../models/user").userJoi;
const UserService = require("../services/UserService");

exports.postSignIn = async (req, res, next) => {
  userJoi
    .validateAsync(req.body)
    .then((valudateResult) => {
      const userMail = req.body.email;
      const userPassword = req.body.password;

      UserService.createNewUser(userMail, userPassword)
        .then(() => {
          return res
            .status(200)
            .json({ message: "User has been created sucessfully!" });
        })
        .catch((err) => {
          console.log("HERE");
          return res.status(422).json({ message: "User is not created" });
        });
    })
    .catch((err) => res.status(400).json({ message: "Not valid inputs" }));
};

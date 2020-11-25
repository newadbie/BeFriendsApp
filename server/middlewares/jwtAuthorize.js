const jwt = require("jsonwebtoken");
const secret = require("../secret");
const User = require("../models/user").userSchema;

const isUserLogged = (req, res, next) => {
  const barearHeader = req.headers["authorization"];
  const barearToken = barearHeader.split(" ")[1];
  console.log(barearToken);

  jwt.verify(barearToken, secret.jwtSecret, (err, authData) => {
    if (err) {
      console.log(err);
      next();
    }
    if (authData) {
      User.findById(authData.id).then((user) => {
        console.log(user);
        req.user = user;
        next();
      });
    }
  });
};

module.exports = isUserLogged;

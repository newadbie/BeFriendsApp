const jwt = require("jsonwebtoken");
const secret = require("../secret");
const User = require("../models/user").userSchema;

const isLogged = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401);
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401);
    }
  });

  const decodedToken = jwt.decode(token);

  const loggedUserId = decodedToken.userId;
  const logoutKey = decodedToken.logoutKey;

  User.findById(loggedUserId)
    .then((user) => {
      if (user.logoutFromAllDevicesKey.toString() !== logoutKey.toString()) {
        return res.status(401);
      }

      req.user = user;
      next();
    })
    .catch((err) => {
      return res.status(401);
    });
};

module.exports = isLogged;

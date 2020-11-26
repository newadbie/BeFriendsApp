const jwt = require("jsonwebtoken");
const secret = require("../secret");
const User = require("../models/user").userSchema;

const isLogged = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not okey" });
  }

  jwt.verify(token, secret.jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .clearCookie("token")
        .status(401)
        .json({ message: "Invalid token" });
    }
    const decodedToken = jwt.decode(token);

    const loggedUserId = decodedToken.userId;
    const logoutKey = decodedToken.logoutKey;

    User.findById(loggedUserId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "You are logged out!" });
        }
        if (user.logoutFromAllDevicesKey.toString() !== logoutKey.toString()) {
          return res.status(401).json({ message: "You are logged out!" });
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        return res.status(401).json({ message: "Something went wrong!" });
      });
  });
};

module.exports = isLogged;

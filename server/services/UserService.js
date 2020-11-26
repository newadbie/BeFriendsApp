const User = require("../models/user").userSchema;
const bcrypt = require("bcrypt");
const crypto = require('crypto');

class UserService {
  static getUserByEmail(userEmail) {
    return User.findOne({ email: userEmail }).then((user) => {
      return user;
    });
  }

  static isPasswordCorrect(passwordToCompare, userEmail) {
    return this.getUserByEmail(userEmail).then((user) => {
      if (!user) {
        return Promise.reject("Email or password is incorrect");
      }

      return bcrypt
        .compare(passwordToCompare, user.password)
        .then((isPasswordCorrect) => {
          return Promise.resolve(isPasswordCorrect ? user : null);
        });
    });
  }

  static createNewUser(userMail, userPassword) {
    userMail = userMail.toString().trim();
    userPassword = userPassword.toString().trim();
    const logoutKey = crypto.randomBytes(128).toString('base64');
    return this.getUserByEmail(userMail).then((user) => {
      if (user) {
        throw new Error("Email is already in use!");
      }
      return bcrypt.hash(userPassword, 12).then((hashedPassword) => {
        return new User({
          email: userMail,
          password: hashedPassword,
          logoutFromAllDevicesKey: logoutKey
        }).save();
      });
    });
  }
}

module.exports = UserService;

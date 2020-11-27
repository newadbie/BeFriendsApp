const User = require("../models/user").userSchema;
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class UserService {
  static async getUserByEmail(userEmail) {
    return User.findOne({ email: userEmail }).then((user) => {
      return Promise.resolve(user ? user : null);
    });
  }

  static async isPasswordCorrect(passwordToCompare, userEmail) {
    const registeredUser = await UserService.getUserByEmail(userEmail);

    if (!registeredUser) {
      throw new Error("Email is nor registered");
    }

    return bcrypt
      .compare(passwordToCompare, registeredUser.password)
      .then((isPasswordCorrect) => {
        return Promise.resolve(isPasswordCorrect ? registeredUser : null);
      });
  }

  static async createNewUser(userMail, userPassword) {
    userMail = userMail.toString().trim();
    userPassword = userPassword.toString().trim();

    const isEmailRegistered = await UserService.getUserByEmail(userMail);
    if (isEmailRegistered) {
      throw new Error("Email is already in use!");
    }

    const logoutKey = crypto.randomBytes(128).toString("base64");
    const hashedPassword = await bcrypt.hash(userPassword, 12);
    return new User({
      email: userMail,
      password: hashedPassword,
      logoutFromAllDevicesKey: logoutKey,
    }).save();
  }
}

module.exports = UserService;

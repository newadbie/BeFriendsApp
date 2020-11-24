const User = require("../models/user").userSchema;
const bcrypt = require("bcrypt");

class UserService {
  static getUserByEmail(userEmail) {
    return User.findOne({ email: userEmail }).then((user) => {
      return user;
    });
  }

  static doesPasswordCompare(passwordToCompare, userEmail) {
    this.getUserByEmail(userEmail).then((user) => {
      if (!user) {
        throw Promise.reject("This email is not assigned to any account!")
      }

      return bcrypt.compare(passwordToCompare, user.password)
      .then(doMatch => {
        return Promise.resolve(doMatch);
      })
    });
  }

  static createNewUser(userMail, userPassword) {
    return this.getUserByEmail(userMail).then((user) => {
      if (user) {
        throw new Error("Email is already in use!");
      }
      return bcrypt.hash(userPassword, 12).then((hashedPassword) => {
        return new User({
          email: userMail,
          password: hashedPassword,
        }).save();
      });
    });
  }
}

module.exports = UserService;

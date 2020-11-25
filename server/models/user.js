const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const joiSchema = Joi.object().keys({
  email: Joi.string().trim().required().email().normalize(),
  password: Joi.string().trim().required().trim(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.only":
            err.message = "Password does not matches";
            break;
        }
      });
      return errors;
    }),
});

module.exports.userSchema = mongoose.model("User", userSchema);
module.exports.userJoi = joiSchema;

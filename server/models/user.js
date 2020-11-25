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
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

module.exports.userSchema = mongoose.model("User", userSchema);
module.exports.userJoi = joiSchema;

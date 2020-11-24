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
  email: Joi.string().required().email().normalize(),
  password: Joi.string().required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

module.exports.userSchema = mongoose.model("User", userSchema);
module.exports.userJoi = joiSchema;

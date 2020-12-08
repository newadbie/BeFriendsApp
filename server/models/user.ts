import mongoose, { Schema, Document } from "mongoose";
import Joi, { ErrorReport } from 'joi';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  logoutFromAllDevicesKey: string;
}

export const joiLoginSchema = Joi.object().keys({
  email: Joi.string().required().empty().email().normalize().trim().messages({
    "string.empty": 'Email is required',
    "string.email": "Email is not valid"
  }),
  password: Joi.string().empty().required().normalize().trim().messages({
    "string.empty": 'Password is required'
  }),
});

export const joiRegisterSchema = Joi.object().keys({
    email: Joi.string().email().normalize().trim().required(),
    name: Joi.string().trim().required(),
    password: Joi.string().normalize().trim().required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#<>()\$%\^&\*])(?=.{8,}).*/)
    .message("Password is too weak!"),
    confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
      .error((errors : any ) => {
        errors.forEach((err : any) => {
          switch (err.code) {
            case "any.only":
              err.message = "Password does not matches";
              break;
          }
        });
        return errors;
      }),
  });

export const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  logoutFromAllDevicesKey: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", userSchema);

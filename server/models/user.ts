import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
  email: string;
  password: string;
  logoutFromAllDevicesKey: string;
}

export const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logoutFromAllDevicesKey: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", userSchema);

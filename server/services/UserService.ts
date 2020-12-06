import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import crypto from "crypto";

class UserService {
  static async findByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ email: email });
    return user;
  }

  static async signInUser(userEmail: string, password: string): Promise<IUser> {
    const user: IUser | null = await this.findByEmail(userEmail);
    if (!user) {
      throw new Error("Email or password is incorrect");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Email or password is incorrect");
    }
    return user;
  }

  static async createNewUser(
    userEmail: string,
    userPassword: string,
    name: string
  ): Promise<IUser> {
    userEmail = userEmail.trim();
    userPassword = userPassword.trim();

    const user = await this.findByEmail(userEmail);
    if (user) {
      throw new Error("This email is already in use!");
    }

    const logoutKey = crypto.randomBytes(128).toString("base64");
    const hashedPassword = await bcrypt.hash(userPassword, 12);
    const newUser = await new User({
      email: userEmail,
      name: name,
      password: hashedPassword,
      logoutFromAllDevicesKey: logoutKey,
    }).save();
    console.log(name);
    return newUser;
  }
}

export default UserService;

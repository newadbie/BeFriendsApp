import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import crypto from 'crypto';

class UserService {
    
  static async findByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ email: email });
    return user;
  }
  static async getIfPasswordIsCorrect(
    passwordToCompare: string,
    userEmail: string
  ): Promise<IUser | null> {
    const registeredUser: IUser | null = await this.findByEmail(userEmail);
    if (!registeredUser) {
      return null;
    }

    const isPasswordCorrect: boolean = await bcrypt.compare(
      registeredUser.password,
      passwordToCompare
    );
    return isPasswordCorrect ? registeredUser : null;
  }

  async createNewUser(userEmail : string, userPassword : string): Promise<IUser> {
    userEmail = userEmail.trim();
    userPassword = userPassword.trim();

    const user = await UserService.findByEmail(userEmail);
    if (user) {
        throw new Error("This email is already in use!");
    }

    const logoutKey = crypto.randomBytes(128).toString("base64");
    const hashedPassword = await bcrypt.hash(userPassword, 12);
    const newUser = await new User({
        email: userEmail,
        password: hashedPassword,
        logoutFromAllDevicesKey: logoutKey,
      }).save();
    return newUser;
  }
}

export default UserService;

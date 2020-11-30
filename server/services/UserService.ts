import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";

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
}

export default UserService;

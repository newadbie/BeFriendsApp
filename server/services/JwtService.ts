import User, { IUser } from "../models/user";
import { jwtSecret } from "../secret";
import jwt from "jsonwebtoken";

class TokenService {
  static generateJwtToken(user: IUser): string {
    const jwtToken: string = jwt.sign(
      { userId: user._id, logoutKey: user.logoutFromAllDevicesKey },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 60,
      }
    );

    return jwtToken;
  }

  static async getTokenUser(token: string): Promise<IUser | null> {
    try {
      const { userId, logoutKey }: string | [key: string] | any = jwt.verify(
        token,
        jwtSecret
      );
      const user = await User.findOne({
        _id: userId,
        logoutFromAllDevicesKey: logoutKey,
      });
      
      if (!user) {
        return null;
      }

      return user;
    } catch (err) {
      return null;
    }
  }
}

export default TokenService;

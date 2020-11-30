import  User, { IUser } from "../models/user";
import UserService from "../services/UserService";
import { jwtSecret } from "../secret";
import jwt from "jsonwebtoken";

class JwtService {
  static generateJwtToken(user: IUser): string {
    const jwtToken: string = jwt.sign(
      { userId: user._id, logoutKey: user.logoutFromAllDevicesKey },
      jwtSecret,
      {
        expiresIn: 60 * 60,
      }
    );

    return jwtToken;
  }

  static async getTokenUser(token : string) : Promise<IUser | null> {
    jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
            return null;
        }
    });

    const decoded = jwt.decode(token);
    const {userId, logoutKey} : string | [key: string] | any = decoded;
    
    const user = await User.findOne({_id: userId, logoutFromAllDevicesKey: logoutKey});
    if (!user) {
        return null;
    }
    return user;
  }
}

export default JwtService;

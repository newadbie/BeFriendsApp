import axios from "axios";
import { appKey } from "../secret";

export class SmsService {
  static sendSms(phoneNumber: number, message: string) {
    axios
      .post(
        "https://justsend.pl/api/rest/v2/message/send",
        {
          message: message,
          from: "Adrian",
          bulkVariant: "ECO",
          doubleEncode: false,
          to: phoneNumber,
        },
        { headers: { "App-Key": appKey } }
      )
      .then((res) => {
        console.log("AUU RAZ");
      })
      .catch((err) => console.log(err));
  }
}

import Debtor, { IDebtor } from "../models/debtor";
import Credit from "../models/cretdit";
import { IUser } from "../models/user";
import { SmsService } from "./SmsService";

class LoanService {
  static getCountedDebtorCredits(currentUser: IUser, payStatus?: string) {
    let match;
    if (!payStatus || payStatus === "all") {
      match = { user: currentUser._id };
    } else {
      match = {user: currentUser._id, isPaidOff: payStatus}
    }
    return Credit.aggregate([
      {
        $match: match
      },
      {
        $group: {
          _id: "$debtor",
          totalCredit: { $sum: "$creditValue" },
          numberOfCredits: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "debtors",
          localField: "_id",
          foreignField: "_id",
          as: "debtor",
        },
      },
      {
        $unwind: "$debtor",
      },
      {
        $project: {
          name: "$debtor.name",
          phoneNumber: "$debtor.phoneNumber",
          totalCredit: "$totalCredit",
          takenCredits: "$numberOfCredits",
        },
      },
      {
        $sort: { name : 1}
      }
    ])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }

  static async getDebtor(debtorData: IDebtor): Promise<IDebtor> {
    const debtor: IDebtor | null = await Debtor.findOne({
      phoneNumber: debtorData.phoneNumber,
    });

    if (debtor && debtor?.name !== debtorData.name) {
      throw new Error("This phone number is in use for another person");
    }

    if (debtor) {
      return debtor;
    }

    const newDebtor: IDebtor = await new Debtor({
      phoneNumber: debtorData.phoneNumber,
      name: debtorData.name,
    }).save();

    return newDebtor;
  }

  static async giveACredit(user: IUser, debtor: IDebtor, creditValue: number) {
    await new Credit({
      user: user,
      debtor: debtor,
      creditValue: creditValue,
      isPaidOff: "unpaid",
    }).save();

    const message: string =
      "Siemka " +
      debtor.name +
      " właśnie Adrian pożyczył Ci " +
      creditValue +
      "zł, będę Ci o tym przypominał co jakiś czas, by Ci to z głowy nie wyleciało!";

    SmsService.sendSms(debtor.phoneNumber, message);
  }
}

export default LoanService;

import { IDebtor } from "../models/debtor";
import Credit, {payStatus } from "../models/cretdit";
import { IUser } from "../models/user";
import { SmsService } from "./SmsService";

class LoanService {
  static getCountedDebtorCredits(currentUser: IUser, payStatus?: string) {
    let match;
    if (!payStatus || payStatus === "all") {
      match = { user: currentUser._id };
    } else {
      match = { user: currentUser._id, isPaidOff: payStatus };
    }
    return Credit.aggregate([
      {
        $match: match,
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
        $sort: { name: 1 },
      },
    ])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }

  static getDebtorCredits(
    currentUser: IUser,
    debtor: IDebtor,
    payStatus?: payStatus
  ) {
    if (!payStatus) {
      return Credit.find({ user: currentUser.id, debtor: debtor._id });
    } else {
      return Credit.find({ user: currentUser.id, debtor: debtor._id, isPaidOff: payStatus });
    }
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

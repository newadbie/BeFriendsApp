import Debtor, { IDebtor } from "../models/debtor";
import Credit from "../models/cretdit";
import { IUser } from "../models/user";

class LoanService {
  static async getDebtor(debtorData: IDebtor): Promise<IDebtor> {
    const debtor: IDebtor | null = await Debtor.findOne({
      phoneNumber: debtorData.phoneNumber,
    });
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
      isPaidOff: false,
    }).save();
  }
}

export default LoanService;

import Debtor, { IDebtor } from "../models/debtor";

class LoanService {
  static async getDebtor(debtorData: IDebtor): Promise<IDebtor | null> {
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
}

export default LoanService;

import Debtor, { IDebtor } from "../models/debtor";

class DebtorService {
  static async getDebtorById(id: string): Promise<IDebtor | null> {
    return Debtor.findOne({ _id: id });
  }

  static async getDebtorByPhone(phoneNumber: number): Promise<IDebtor | null> {
    return Debtor.findOne({ phoneNumber: phoneNumber });
  }

  /* Get debtor if exist, if not create it. */
  static async getValidDebtor(debtorData: IDebtor): Promise<IDebtor> {
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
}

export default DebtorService;

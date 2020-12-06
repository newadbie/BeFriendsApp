const Borrower = require("../models/borrower").borrowerSchema;

class BorrowerService {
  getBorrowerData = async (phoneNumber, borrowerName) => {
    const borrower = await Borrower.findOne({ phoneNumber: phoneNumber });
    if (!borrower) {
      return await this.registerNewBorrower(phoneNumber, borrowerName);
    }
    return borrower;
  };

  registerNewBorrower = (phoneNumber, borrowerName) => {
    return new Borrower({
      name: borrowerName,
      phoneNumber: phoneNumber,
    }).save();
  };
}

module.exports = BorrowerService;

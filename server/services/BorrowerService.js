const Borrower = require("../models/borrower").borrowerSchema;

exports.getBorrowerData = async (phoneNumber, borrowerName) => {
  const borrower = await Borrower.findOne({ phoneNumber: phoneNumber });
  if (!borrower) {
    return await  this.registerNewBorrower(phoneNumber, borrowerName);
  }
  return borrower;
};

exports.registerNewBorrower = (phoneNumber, borrowerName) => {
  return new Borrower({
    name: borrowerName,
    phoneNumber: phoneNumber,
  }).save();
};

const Borrower = require("../models/borrower").borrowerSchema;

exports.isBorrowerRegistered = async (phoneNumber) => {
  return Borrower.findOne({ phoneNumber: phoneNumber }).then((borrower) => {
    if (borrower) {
      return Promise.resolve(borrower);
    } else {
      return Promise.resolve(null);
    }
  });
};

exports.registeredNewBorrower = (phoneNumber, borrowerName) => {
  return new Borrower({
    name: borrowerName,
    phoneNumber: phoneNumber,
  }).save();
};

const joiLoan = require("../models/loan").joiGiveLoan;
const Loan = require("../models/loan").loanSchema;
const BorrowerService = require("../services/BorrowerService");

exports.postLoan = async (req, res, next) => {
  const borrower = await BorrowerService.getBorrowerData(
    req.body.borrower.phoneNumber,
    req.body.borrower.name
  );

  if (borrower.name !== req.body.borrower.name) {
    return res.status(422).json({
      message: "This phone number is already assigned to the other person",
    });
  }

  const loanData = {
    borrower: borrower,
    lender: req.user._id.toString(),
    loanValue: req.body.loanValue,
  };

  await joiLoan.validateAsync(loanData).catch((err) => {
    return res.status(422).json({ message: err.message });
  });

  return res.status(200).json({ message: "Your loan is added successfully!" });
};

exports.getLoans = async (req, res, next) => {
  const loggedUserId = req.user._id;
  const borrowers = await Loan.find({ lender: loggedUserId }).populate(
    "borrower"
  );
  if (!borrowers) {
    return res.status(422).json({ message: "Something went wrong ;/" });
  }
  const response = borrowers.map((borrower) => {
    return {
      borrower: {
        name: borrower.borrower.name,
        phoneNumber: borrower.borrower.phoneNumber,
      },
      loanValue: borrower.loanValue,
    };
  });
  return res.status(200).json(response);
};

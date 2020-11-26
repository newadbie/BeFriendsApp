const joiLoan = require("../models/loan").joiGiveLoan;
const Loan = require("../models/loan").loanSchema;
const BorrowerService = require("../services/BorrowerService");

exports.postLoan = async (req, res, next) => {
  BorrowerService.isBorrowerRegistered(req.body.borrower.phoneNumber)
    .then((borrower) => {
      if (!borrower) {
        return BorrowerService.registeredNewBorrower(
          req.body.borrower.phoneNumber,
          req.body.borrower.name
        );
      }
      return Promise.resolve(borrower);
    })
    .then((borrower) => {
      if (borrower.name !== req.body.borrower.name) {
        return res.status(422).json({message: "This phone number is assigned to another person!"});
      }
      const loanData = {
        borrower: borrower,
        lender: req.user._id.toString(),
        loanValue: req.body.loanValue,
      };
      joiLoan
        .validateAsync(loanData)
        .then((result) => {
          return new Loan(loanData).save();
        })
        .then((result) => {
          return res.status(200).json({ message: "ok" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(401).json({ message: "incorrect!" });
        });
    });
};

exports.getLoans = (req, res, next) => {
  const loggedUserId = req.user._id;
  Loan.find({ lender: loggedUserId })
  .populate('borrower')
    .then((userLoans) => {
      const responseData = userLoans.map((loan) => {
        return {
          borrower: {
            name: loan.borrower.name,
            phoneNumber: loan.borrower.phoneNumber,
          },
          loanValue: loan.loanValue,
        };
      });
      return res.status(200).json(responseData);
    })
    .catch((err) => {
      return res.status(422).json({ message: "Something went wrong ;/" });
    });
};

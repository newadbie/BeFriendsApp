import LoanItem from "../../components/Loan-item";

const LoanList = (props) => {
  const distinctPersons = props.loans
    .map((loan) => {
      return {
        name: loan.borrower.name,
        phoneNumber: loan.borrower.phoneNumber,
      };
    })
    .filter((person, index, self) => {
      return (
        self.findIndex(
          (t) => t.phoneNumber === person.phoneNumber && t.name === person.name
        ) === index
      );
    });

  const loanList = distinctPersons.map((person) => {
    let borrowedMoney = 0;
    props.loans
      .filter((loan) => loan.borrower.phoneNumber === person.phoneNumber)
      .forEach((loan) => {
        borrowedMoney += +loan.loanValue;
      });
    return (
      <LoanItem
        key={person.phoneNumber}
        name={person.name}
        ows={+borrowedMoney}
      />
    );
  });
  return <div>{loanList}</div>;
};

export default LoanList;

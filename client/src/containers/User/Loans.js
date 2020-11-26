import { useEffect, useState } from "react";

import axios from "axios";

import LoanList from './LoanList';

const Loans = (props) => {
  const [getLoans, setLoans] = useState([]);

  let content = null;

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/getLoans", { withCredentials: true })
      .then((res) => {
        setLoans(res.data);
        content = <LoanList loans={res.data} />
      })
      .catch((err) => console.log(err));
  }, []);

  return <LoanList loans={getLoans} />;
};

export default Loans;

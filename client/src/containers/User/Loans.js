import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import axios from "axios";

import Loan from './Loan';

const Loans = (props) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [getLoans, setLoans] = useState([]);
  const isLogged = useSelector((state) => state.isLogged);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/getLoans", { withCredentials: true })
      .then((res) => {
        setLoans(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let content = null;
  switch (isLogged) {
    case null:
      content = null;
      break;
    case false:
      content = <Redirect to="/login" />;
      break;
    case true:
      content = <Loan loans={getLoans}/>;
      break;
  }

  return content;
};

export default Loans;

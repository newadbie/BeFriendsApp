import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import GiveLoan from "../containers/User/GiveLoan";
import Loan from '../containers/User/Loans';
import { useSelector } from "react-redux";

const LoanUtil = () => {
  const isLogged = useSelector((state) => state.isLogged);

  let content = null;
  switch (isLogged) {
    case null:
      content = null;
      break;
    case false:
      content = <Redirect to="/login" />;
      break;
    case true:content = (
      <React.Fragment>
      <Switch>
        <Route path="/user/loans/give">
          <p>DAJE</p>
        </Route>
        <Route path="/user/loans">
          <Loan />
        </Route>
        </Switch>
      </React.Fragment> );
      break;
  }

  return content;
};

export default LoanUtil;

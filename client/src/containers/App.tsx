import React from "react";
import { Helmet } from "react-helmet";
import { Switch } from "react-router-dom";
import { PublicRoute } from "../router/PublicRoute";
import { UnLoggedRoute } from "../router/UnLoggedRoute";
import { AppLogin } from "./AppLogin";
import { HomePage } from "../components/Homepage";
import { useSelector } from "react-redux";
import { getAuth } from "../selectors";
import "./App.scss";

export const App: React.FC = () => {
  const isAuthenticated: boolean = useSelector(getAuth).isAuthenticated;
  
  console.log(isAuthenticated);
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Po przyjacielsku!</title>
      </Helmet>
        <Switch>
          <UnLoggedRoute path="/login" component={AppLogin} />
          <PublicRoute path="/" component={HomePage} />
        </Switch>
    </React.Fragment>
  );
};

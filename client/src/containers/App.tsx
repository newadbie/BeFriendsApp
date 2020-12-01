import React from "react";
import { Helmet } from "react-helmet";
import { Switch } from "react-router-dom";
import { PublicRoute } from "../router/PublicRoute";
import { HomePage } from "../components/HomePage";
import { AppNavbar } from "./AppNavbar";
import { AppLogin } from "./AppLogin";
import Wrapper from "../components/hoc/wrapper";

import "./App.scss";

const testComp: React.FC = () => {
  return <h1> HELLO WORLD</h1>;
};

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Po przyjacielsku!</title>
      </Helmet>
      <AppNavbar />
      <Wrapper fluid>
        <Switch>
          <PublicRoute path="/login" component={AppLogin} />
          <PublicRoute path="/logout" component={HomePage} />
          <PublicRoute path="/" component={HomePage} />
        </Switch>
      </Wrapper>
    </React.Fragment>
  );
};

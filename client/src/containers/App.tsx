import React from "react";
import { Helmet } from "react-helmet";
import { Switch } from "react-router-dom";
import { PublicRoute } from "../router/PublicRoute";
import { AppNavbar } from "./AppNavbar";
import  { AppLogin } from "./AppLogin";
import {HomePage} from "../components/Homepage";

import "./App.scss";
import { Container } from "react-bootstrap";


export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Po przyjacielsku!</title>
      </Helmet>
      <AppNavbar />
      <Container fluid className="p-3">
        <Switch>
          <PublicRoute path="/login" component={AppLogin} />
          <PublicRoute path="/" component={HomePage} />
        </Switch>
      </Container>
    </React.Fragment>
  );
};

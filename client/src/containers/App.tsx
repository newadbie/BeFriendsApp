import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch } from 'react-router-dom';
import { PublicRoute } from '../router/PublicRoute';
import { HomePage } from "../components/HomePage";

import './App.css';

export const App : React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Po przyjacielsku!</title>
      </Helmet>
    <Switch>
      <PublicRoute path="/" component={HomePage} />
    </Switch>
    </React.Fragment>
  )
}
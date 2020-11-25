import React from "react";
import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Register from "./Register/Register";
import Login from './Login/Login';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Container className="mt-5" fluid>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
};

export default App;

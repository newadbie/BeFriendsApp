import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Register from "./Register/Register";
import Login from "./Login/Login";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Homepage";

const App = () => {
  const [isUserLogged, setUserLoggedState] = useState(null);
  const [user, setUser] = useState(null);

  const signOutHandler = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => console.log("Error"));
  };

  const signInHandler = (user) => {
    const LOGIN_URI = "http://localhost:8080/login";

    axios
      .post(
        LOGIN_URI,
        { email: user.email, password: user.password },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        props.signIn(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Router>
        <Navbar signOut={signOutHandler} />
        <Container className="mt-5" fluid>
          <Switch>
            <Route path="/register">
              <Register isUserLogged={isUserLogged} />
            </Route>
            <Route path="/login">
              <Login signIn={signInHandler} isUserLogged={false} />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
};

export default App;

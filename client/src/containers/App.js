import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Register from "./Register/Register";
import Login from "./Login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Homepage";

const App = () => {
  const [isUserLogged, setUserLoggedState] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser !== null) {
      setUserLoggedState(true);
      setUser(currentUser);
    } else {
      setUser(null);
      setUserLoggedState(false);
    }
  }, [user]);

  const signInHandler = (jsonUserData) => {
    console.log(jsonUserData);
    if (jsonUserData) {
      const userData = JSON.stringify(jsonUserData);
      setUser(userData);
      setUserLoggedState(true);
      localStorage.setItem("user", userData);
    }
  };
  const signOutHandler = () => {
    if (localStorage.getItem("user") !== null) {
      localStorage.removeItem("user");
      setUser({});
      setUserLoggedState(false);
    }
  };

  return (
    <React.Fragment>
      <Router>
        <Navbar isUserLogged={isUserLogged} signOut={signOutHandler} />
        <Container className="mt-5" fluid>
          <Switch>
            <Route path="/register">
              {localStorage.getItem("user") !== null || user !== null ? (
                <Redirect to="/" />
              ) : (
                <Register isUserLogged={isUserLogged} />
              )}
            </Route>
            <Route path="/login">
              {localStorage.getItem("user") !== null || user !== null ? (
                <Redirect to="/" />
              ) : (
                <Login signIn={signInHandler} isUserLogged={isUserLogged} />
              )}
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

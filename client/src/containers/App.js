import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Register from "./Register/Register";
import Login from "./Login/Login";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../actions/isLogged";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Homepage";

const App = (props) => {
  const SERVER_URI = "http://localhost:8080";
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/getLoggedUser",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(login());
      })
      .catch(() => dispatch(logout()));
  }, [isLogged]);

  const signOutHandler = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then((res) => {
        dispatch(logout());
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
        dispatch(login());
        return <Redirect to="/" />;
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
              <Register />
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

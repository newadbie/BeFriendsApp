import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { AppLoginForm } from "../components/AppLoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { Redirect } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";

export const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submit = () => {
    axios
      .post(
        "http://localhost:8080/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(login());
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
        <Container>
          <h1 className="text-center mb-5">Zaloguj się!</h1>
          <AppLoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            preventDefault
          >
            <Button
              onClick={submit}
              type="submit"
              className="ml-auto mr-auto d-block"
            >
              Zaloguj!
            </Button>
          </AppLoginForm>
        </Container>
    </>
  );
};

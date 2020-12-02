import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { AppLoginForm } from "../components/AppLoginForm";
import axios from "axios";

export const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h1 className="text-center mb-5">Zaloguj się!</h1>
      <AppLoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
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
  );
};

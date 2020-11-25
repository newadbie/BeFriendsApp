import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Redirect } from "react-router";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LOGIN_URI = "http://localhost:8080/login";

  const signIn = () => {
    axios
      .post(LOGIN_URI, { email: email, password: password })
      .then((res) => {
        props.signIn(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="w-50 mt-auto mb-auto">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="ml-auto mr-auto d-block"
          onClick={signIn}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

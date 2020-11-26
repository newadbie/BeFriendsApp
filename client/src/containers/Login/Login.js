import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const Login = (props) => {
  const isLogged = useSelector((state) => state.isLogged);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let content = null;
  switch (isLogged) {
    case null:
      content = null;
      break;
    case true:
      content = <Redirect to="/" />;
      break;
    case false:
      content = (
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
              onClick={(e) =>
                props.signIn({ email: email, password: password })
              }
            >
              Login
            </Button>
          </Form>
        </Container>
      );
  }

  return content;
};

export default Login;

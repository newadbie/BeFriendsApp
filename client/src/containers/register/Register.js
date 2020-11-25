import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const Register = (props) => {
  const REGISTER_URL = "http://localhost:8080/register";

  const [isSuccessfull, setIsSucessfull] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);
  let errorAlerts = null;

  if (errors.length > 0) {
    errorAlerts = errors.map((e, index) => (
      <Alert variant="danger" key={index}>
        {e}
      </Alert>
    ));
  }

  const addErrorsHandler = (updatedErrors) => {
    setErrors([]);
    if (!Array.isArray(updatedErrors)) {
      return;
    }
    setErrors(updatedErrors);
  };

  const sendForm = () => {
    let errors = [];

    if (confirmPassword !== password) {
      errors.push("Password doesn not match!");
    }
    if (errors.length > 0) {
      addErrorsHandler(errors);
      return;
    }

    const postData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post(REGISTER_URL, postData)
      .then((res) => {
        setErrors([]);
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setIsSucessfull(true);
        setTimeout(() => {
          setIsSucessfull(false);
        }, 3000);
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        addErrorsHandler([errorMessage]);
      });
  };
  return (
    <Container className="w-50">
      {isSuccessfull ? (
        <Alert variant="success">User has been created successfully!</Alert>
      ) : null}
      {errorAlerts}
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password!"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="ml-auto mr-auto d-block"
          onClick={sendForm}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;

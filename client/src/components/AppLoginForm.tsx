import React from "react";
import { Button, Form } from "react-bootstrap";

type LoginFormProps = {
  email: string;
  setEmail(value: string): void;
  password: string;
  setPassword(value: string): void;
  preventDefault?: boolean;
};

export const AppLoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  preventDefault,
  children
}) => {
  const setPrevent = (e: React.FormEvent<HTMLFormElement>) => {
    if (preventDefault) {
      e.preventDefault();
    }
  };
  return (
    <Form className={"w-50 ml-auto mr-auto"} onSubmit={(e) => setPrevent(e)}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Hasło</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      {children}
    </Form>
  );
};

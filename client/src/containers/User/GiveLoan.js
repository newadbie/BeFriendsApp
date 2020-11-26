import { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const GiveLoan = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [borrowedValue, setBorrowedValue] = useState(1);

  const createALoan = () => {
    const data = {
      borrower: {
        name: name,
        phoneNumber: phone.toString(),
      },
      loanValue: borrowedValue,
    };
    axios
      .put("http://localhost:8080/user/giveLoan", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Success!!! Someone took a loan!");
      })
      .catch((err) => {
        console.log("Damn, something went wrong :/");
      });
  };

  return (
    <Container className="w-25">
      <h1 className="text-center mb-5">Add a loan!</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="name">
          <Form.Label>Borrower name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input borrower name!"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            length="9"
            required
          />
        </Form.Group>
        <Form.Group controlId="borrowedValue">
          <Form.Label>Borrowed amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Input borrowed value"
            onChange={(e) => setBorrowedValue(e.target.value)}
            value={borrowedValue}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="ml-auto mr-auto d-block"
          onClick={createALoan}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default GiveLoan;

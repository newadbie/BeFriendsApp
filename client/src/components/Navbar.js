import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = (props) => {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Be friends!</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav>
          <LinkContainer to="/register">
            <Nav.Link href="/register">Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link href="/login">Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    </React.Fragment>
  );
};

export default Navigation;

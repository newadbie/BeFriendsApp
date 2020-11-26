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
          <LinkContainer to="/">
            <Nav.Link>Pricing</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          {props.isUserLogged ? (
            <React.Fragment>
              <Nav.Link onClick={props.signOut}>Logout</Nav.Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LinkContainer to="/register">
                <Nav.Link href="/register">Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link href="/login">Login</Nav.Link>
              </LinkContainer>
            </React.Fragment>
          )}
        </Nav>
      </Navbar>
    </React.Fragment>
  );
};

export default Navigation;

import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Navigation = (props) => {
  const isUserLogged = useSelector((state) => state.isLogged);

  let loginNav = null;
  switch (isUserLogged) {
    case null:
      loginNav = <h1>Loading...</h1>;
      break;
    case true:
      loginNav = (
        <React.Fragment>
          <Nav.Link onClick={props.signOut}>Logout</Nav.Link>
          <LinkContainer to="/user/loans">
            <Nav.Link to="/user/loans">Your loans!</Nav.Link>
          </LinkContainer>
        </React.Fragment>
      );
      break;
    case false:
      loginNav = (
        <React.Fragment>
          <LinkContainer to="/register">
            <Nav.Link href="/register">Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link href="/login">Login</Nav.Link>
          </LinkContainer>
        </React.Fragment>
      );
  }
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
        <Nav>{loginNav}</Nav>
      </Navbar>
    </React.Fragment>
  );
};

export default Navigation;

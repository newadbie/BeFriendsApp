import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavbarList, positions } from "../components/NavbarList";
import axios from 'axios';
import { logout } from "../slices/authSlice";
import { getAuth } from "../selectors";
import { LinkContainer } from "react-router-bootstrap";

export const AppNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuth).isAuthenticated;

  const signOut = () => {
    axios.post("http://localhost:8080/logout", {}, { withCredentials: true });
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Po przyjacielsku</Navbar.Brand>
      <NavbarList>
      <LinkContainer exact to="/Homepage">
            <Nav.Link>Strona Główna</Nav.Link>
          </LinkContainer>      <LinkContainer exact={true} to="/">
            <Nav.Link>Strona Główna</Nav.Link>
          </LinkContainer>
      </NavbarList>
      <NavbarList position={positions.right}>
        {!isAuthenticated ? (
          <LinkContainer exact to="/login">
            <Nav.Link>Zaloguj</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer exact to="/">
            <Nav.Link onClick={signOut}>Wyloguj</Nav.Link>
          </LinkContainer>
        )}
      </NavbarList>
    </Navbar>
  );
};

import React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../selectors";

export enum positions {
  left,
  right,
}

type NavbarListPosition = {
  position?: positions;
};

export const NavbarList: React.FC<NavbarListPosition> = ({ position }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuth).isAuthenticated;

  const determineClass = () => {
    if (position === positions.left) {
      return "mr-auto";
    } else {
      return "ml-auto";
    }
  };

  const signOut = () => {
    axios.post("http://localhost:8080/logout", {}, { withCredentials: true });
    dispatch(logout());
  };

  return (
    <Nav className={determineClass()}>
      {!isAuthenticated ? (
        <LinkContainer exact to="/login">
          <Nav.Link>Zaloguj</Nav.Link>
        </LinkContainer>
      ) : (
        <LinkContainer exact to="/">
          <Nav.Link onClick={signOut}>Wyloguj</Nav.Link>
        </LinkContainer>
      )}
    </Nav>
  );
};

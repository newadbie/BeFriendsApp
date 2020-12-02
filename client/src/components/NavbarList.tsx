import React from "react";
import Nav from "react-bootstrap/Nav";
import axios from 'axios';

export enum positions {
  left,
  right,
}

type NavbarListPosition = {
  position?: positions;
};

export const NavbarList: React.FC<NavbarListPosition> = ({ position }) => {
  const determineClass = () => {
    if (position === positions.left) {
      return "mr-auto";
    } else {
      return "ml-auto";
    }
  };

  const signOut = () => {
    axios.post("http://localhost:8080/logout", {}, {withCredentials: true});
  }

  return (
    <Nav className={determineClass()}>
      <Nav.Link href="/login">Zaloguj</Nav.Link>
      <Nav.Link href="/" onClick={signOut}>Wyloguj</Nav.Link>
    </Nav>
  );
};

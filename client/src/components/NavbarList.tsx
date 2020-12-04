import React from "react";
import Nav from "react-bootstrap/Nav";

export enum positions {
  left,
  right,
}

type NavbarListPosition = {
  position?: positions;
};

export const NavbarList: React.FC<NavbarListPosition> = ({ position, children }) => {
  const determineClass = () => {
    if (position === positions.left || position === undefined) {
      return "mr-auto";
    } else {
      return "ml-auto";
    }
  };

  return (
    <Nav className={determineClass()}>
      {children}
    </Nav>
  );
};

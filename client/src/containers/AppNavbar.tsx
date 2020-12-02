import React from "react";
import { Navbar } from "react-bootstrap";
import { NavbarList } from "../components/NavbarList";

export const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Po przyjacielsku</Navbar.Brand>
      <NavbarList />
    </Navbar>
  );
};

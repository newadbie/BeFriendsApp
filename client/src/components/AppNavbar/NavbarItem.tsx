import React from "react";
import { NavLink } from "react-router-dom";

export interface NavbarItemProps {
  href: string;
  text: string;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ href, text }) => {
  return (
    <li className="app-navbar-link">
      <NavLink exact to={href}>
        {text}
      </NavLink>
    </li>
  );
};

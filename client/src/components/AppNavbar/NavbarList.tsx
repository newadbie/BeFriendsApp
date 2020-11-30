import React from "react";

export enum float {
  left = 0,
  right = 1,
}

export interface NavbarListProps {
  float?: float;
}

export const NavbarList: React.FC<NavbarListProps> = ({ float, children }) => {
  const determineClass = () => {
    if (float === 1) {
      return "navbar-list right";
    } else if (float === 0 || !float) {
      return "navbar-list";
    }
  };
  return (
    <section className={determineClass()}>
      <ul>{children}</ul>
    </section>
  );
};

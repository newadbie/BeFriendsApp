import React from "react";
import { Container } from "react-bootstrap";
import { Route, RouteProps } from "react-router-dom";
import { AppNavbar } from "../containers/AppNavbar";

interface PublicRouteProps extends RouteProps {
  path: string;
  component: any;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  path: Path,
}) => {
  return (
    <Route path={Path}>
      <AppNavbar />
      <Container className="p-3" fluid>
        <Component />
      </Container>
    </Route>
  );
};

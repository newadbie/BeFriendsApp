import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { getAuth } from "../selectors";
import { useSelector } from "react-redux";
import { AppNavbar } from "../containers/AppNavbar";
import { Container } from "react-bootstrap";

interface PublicRouteProps extends RouteProps {
  path: string;
  component: any;
}

export const UnLoggedRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  path: Path,
}) => {
  const { isAuthenticated } = useSelector(getAuth);
  return (
    <Route path={Path}>
      {!isAuthenticated ? (
        <>
          <AppNavbar />
          <Container className="p-3" fluid>
            <Component />
          </Container>{" "}
        </>
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
};

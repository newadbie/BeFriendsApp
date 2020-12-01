import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface PublicRouteProps extends RouteProps {
  path: string,
  component: any
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  path: Path
}) => {
  return <Route path={Path} render={Component}></Route>;
};

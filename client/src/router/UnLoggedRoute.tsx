import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import axios from 'axios';

interface PublicRouteProps extends RouteProps {
  path: string,
  component: any
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  path: Path
}) => {
    useEffect(() => {
        console.log("laj ;aj laj")
    },[])
  return <Route path={Path}>
    <Component />
  </Route>;
};

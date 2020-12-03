import React from "react";
import { Switch } from "react-router-dom";
import { AppLogin } from "../containers/AppLogin";
import { AppNavbar } from "../containers/AppNavbar";
import { PublicRoute } from "../router/PublicRoute";
import { UnLoggedRoute } from "../router/UnLoggedRoute";
import { HomePage } from "./Homepage";
import Loading from "./Loading";

type RouteProps = {
  isLoading: boolean;
};

const Routes: React.FC<RouteProps> = ({ isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Switch>
      <UnLoggedRoute path="/login" component={AppLogin} />
      <PublicRoute path="/" component={HomePage} />
    </Switch>
  );
};

export default Routes;

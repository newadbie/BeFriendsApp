import React, { useState } from "react";
import { AppLogin } from "../containers/AppLogin";
import { PublicRoute } from "../router/PublicRoute";
import { UnLoggedRoute } from "../router/UnLoggedRoute";
import { HomePage } from "./Homepage";
import { CSSTransition } from "react-transition-group";

type RouteProps = {
  isLoading: boolean;
};

const Routes: React.FC<RouteProps> = ({ isLoading }) => {
  const [loaded, setLoaded] = useState(false);

  const setLoadedHandler = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 1300); // Timeout + transition time
  };

  return (
    <>
      {!loaded ? (
        <CSSTransition
          in={isLoading}
          timeout={1000}
          className="div-loading"
          onExit={setLoadedHandler}
        >
          <h1>Loading...</h1>
        </CSSTransition>
      ) : null}
      <CSSTransition in={!isLoading} timeout={1250} className="div-main">
        <div>
          <Switch>
            <UnLoggedRoute path="/login" component={AppLogin} />
            <PublicRoute path="/" component={HomePage} />
          </Switch>
        </div>
      </CSSTransition>
    </>
  );
};

export default Routes;

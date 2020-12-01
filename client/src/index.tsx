import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./containers/App";

import history from './utils/history';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

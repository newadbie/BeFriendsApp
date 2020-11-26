import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";

import { createStore } from "redux";
import { Provider } from "react-redux";

import allReducers from "./reducers";

import "./main.css";

let store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

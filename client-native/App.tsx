import React from "react";
import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Application } from "./containers/App";

const App = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
};

export default App;

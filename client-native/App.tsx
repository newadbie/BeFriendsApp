import "react-native-gesture-handler";
import React from "react";
import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Application } from "./containers/App";
import { StatusBar } from "react-native";

const App = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return (
    <Provider store={store}>
      <StatusBar />
      <Application />
    </Provider>
  );
};

export default App;

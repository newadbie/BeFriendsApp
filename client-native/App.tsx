import "react-native-gesture-handler";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Application } from "./containers/App";
import { StatusBar } from "react-native";
import { Spinner } from "./components/Spinner";

const App = () => {
  const [isAppLoaded,setAppLoadedState] = useState(false);

  const store = configureStore({
    reducer: rootReducer,
  });
  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          Ionicons: require('./assets/Ionicons.ttf')
        })
      }
      catch (err) {
        console.log(err)
      };
      setAppLoadedState(true);
    };
    loadFont();
  }, []);

  if(!isAppLoaded)
  {
    return <Spinner />
  }

  return (
    <Provider store={store}>
      <StatusBar />
      <Application />
    </Provider>
  );
};

export default App;

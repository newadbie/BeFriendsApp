import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { LoginScreen } from "../routes/WithLoadingScreens";
import { Spinner } from "../components/Spinner";

import { getAuth } from "../selectors/";
import { HomeScreen, LogoutScreen } from "../routes/WithLoadingScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const Application = () => {
  const isAuthenticated = useSelector(getAuth).isAuthenticated;
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("http://192.168.0.241:8080/checkLogin")
      .then((res) => {
        if (res.data.isLogged) {
          dispatch(login(res.data));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home Screen" openByDefault={true}>
        <Drawer.Screen component={HomeScreen} name="Home Screen" />
        <Drawer.Screen component={LogoutScreen} name="Logout" />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

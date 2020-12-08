import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { Spinner } from "../components/Spinner";

import { getAuth } from '../selectors'

import { authScreens, userScreens } from "../helpers/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const Application = () => {
  const [isLoaded, setLoaded] = useState(false);
  const isLogged = useSelector(getAuth).isAuthenticated;
  const dispatch = useDispatch();

  const checkLogin = async () => {
    try {
      const res = await axios.post("http://192.168.0.241:8080/checkLogin")
      console.log(res.data.isLogged)
      if (res.data.isLogged) {
        dispatch(login(res.data));
      }
    }
    catch (err) {
      console.log(err);
    }
    setLoaded(true);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.entries({
          ...(isLogged ? userScreens : authScreens),
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} key={name}/>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

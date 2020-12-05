import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { getAuth } from "../selectors";
import {LoanScreen} from './LoanScreen';
import {LoginScreen} from './LoginScreen';


export const Application = () => {
  const [isLoading, setLoading] = useState(true);
  const isAuthenticated = useSelector(getAuth).isAuthenticated;

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
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isAuthenticated ? <LoanScreen /> : <LoginScreen />}
    </View>
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

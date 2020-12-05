import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { getAuth } from "../selectors";
import { LoanScreen } from "./LoanScreen";
import { LoginScreen } from "./LoginScreen";
import { Spinner } from "../components/Spinner";
import { WithLoading } from "../components/WithLoading";

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

  if(!isLoaded) {
    return <Spinner />
  }

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <WithLoading Component={LoanScreen} />
      ) : (
        <WithLoading Component={LoginScreen} />
      )}
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

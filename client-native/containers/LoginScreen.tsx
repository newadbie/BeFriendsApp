import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";

import axios from "axios";

import { login } from "../slices/authSlice";
import { RowInput } from "../components/RowInput";
import { Error } from "../components/Error";
import { Button } from "../components/Button";

import { SpinerChildrenState } from "../components/WithLoading";

export const LoginScreen: React.FC<SpinerChildrenState> = ({
  setLoadingState,
  isLoading,
  navigation,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = () => {
    setLoadingState(true);
    axios
      .post("http://192.168.0.241:8080/login", {
        email: email,
        password: password,
      })
      .then(() => {
        dispatch(login(email));
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zaloguj się!</Text>
      <RowInput
        text="Email"
        value={email}
        changeValueAction={setEmail}
        keyboardType="email-address"
      />
      <RowInput
        text="Hasło"
        value={password}
        changeValueAction={setPassword}
        secureTextEntry
      />
      <Button title="Zaloguj się" onPress={signIn} />
      <Error text={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    width: wp("75%"),
    marginLeft: wp("12.5%"),
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 30,
  },
  button: {
    fontSize: 20,
  },
});

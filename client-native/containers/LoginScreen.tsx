import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";

import axios from "axios";

import { login } from "../slices/authSlice";
import { LoginInput } from "../components/LoginInput";
import { Error } from "../components/Error";
import { Button } from '../components/Button';

import { SpinerChildrenState } from '../components/WithLoading';

export const LoginScreen: React.FC<SpinerChildrenState> = ({setLoadingState}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    setLoadingState(true);
    axios
      .post("http://192.168.0.241:8080/login", {
        email: email,
        password: password,
      })
      .then((e) => {
        dispatch(login(email));
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => setLoadingState(false));
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Zaloguj się!</Text>
        <LoginInput text="Email" value={email} changeValueAction={setEmail} />
        <LoginInput
          text="Hasło"
          value={password}
          changeValueAction={setPassword}
          secureTextEntry
        />
        <View style={{ marginTop: 10 }}></View>
        <Button title="Zaloguj się" onPress={signIn}/>
        <Error text={error} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: wp("75%"),
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 30,
  },
  button: {
    fontSize:20
  }
});

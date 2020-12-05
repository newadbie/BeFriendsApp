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

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
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
      });
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

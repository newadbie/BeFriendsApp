import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { login } from "../slices/authSlice";
import {useDispatch} from 'react-redux';
import { LoginInput } from "../components/LoginInput";
import axios from "axios";

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    axios
      .post("http://192.168.0.241:8080/login", {
        email: email,
        password: password,
      })
      .then((e) => {
        dispatch(login(email))
      })
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Login!</Text>
        <LoginInput text="Email" value={email} changeValueAction={setEmail} />
        <LoginInput
          text="Password"
          value={password}
          changeValueAction={setPassword}
          secureTextEntry
        />
        <View style={{ marginTop: 10 }}></View>
        <Button title="Zaloguj się" onPress={signIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: 300,
    width: wp("75%"),
    marginBottom: 130,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 30,
  },
});

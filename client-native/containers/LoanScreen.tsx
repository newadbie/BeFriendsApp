import React from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { View, Text, StyleSheet } from "react-native";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Button } from '../components/Button';

export const LoanScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    axios
      .post("http://192.168.0.241:8080/logout")
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Button title="Wyloguj się" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("75%"),
    alignContent: "center",
    justifyContent: "center"
  }
})
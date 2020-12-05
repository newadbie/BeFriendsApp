import React from "react";
import { View, Text, Button } from "react-native";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

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
    <View>
      <Text>Hejka</Text>
      <Button title="Wyloguj się" onPress={signOut} />
    </View>
  );
};

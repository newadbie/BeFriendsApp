import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { LoginInput } from "../components/LoginInput";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Login!</Text>
        <LoginInput text="Email" value={email} changeValueAction={setEmail} />
        <LoginInput
          text="Password"
          value={email}
          changeValueAction={setEmail}
          secureTextEntry
        />
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

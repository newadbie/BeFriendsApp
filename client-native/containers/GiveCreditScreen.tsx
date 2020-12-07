import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { RowInput } from "../components/RowInput";
import {Button } from '../components/Button';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const GiveCreditScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [debtorName, setDebtorName] = useState("");
  const [creditValue, setCreditValue] = useState(0);

  const setPhoneNumberHandler = (value: string) => {
    setPhoneNumber(+value);
  };
  const setCreditValueHandler = (value: string) => {
    setCreditValue(+value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj dłużnika!</Text>
      <RowInput
        text="Telefon dłużnika"
        value={phoneNumber}
        changeValueAction={setPhoneNumberHandler}
        keyboardType="phone-pad"
        maxLength={9}
      />
      <RowInput
        text="Imię dłużnika"
        value={debtorName}
        changeValueAction={setDebtorName}
      />
      <RowInput
        text="Wartość kredytu"
        value={creditValue}
        changeValueAction={setCreditValueHandler}
        keyboardType="numeric"
      />
      <Button title="Pożycz hajsiwko" onPress={() => Alert.alert("Pożyczono")}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("75%"),
    marginLeft: wp("12.5%"),
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 30,
  },
});

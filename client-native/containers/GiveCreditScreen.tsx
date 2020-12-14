import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RowInput } from "../components/RowInput";
import { SpinerChildrenState } from "../components/WithLoading";
import { Button } from "../components/Button";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fetchDebtors } from "../slices/debtorsSlice";

export const GiveCreditScreen: React.FC<SpinerChildrenState> = ({
  setLoadingState,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [debtorName, setDebtorName] = useState("");
  const [creditValue, setCreditValue] = useState("");

  const giveACredit = () => {
    setLoadingState(true);
    const debtor = {
      phoneNumber: +phoneNumber,
      name: debtorName,
    };

    axios
      .put(
        "http://192.168.0.241:8080/giveCredit",
        {
          debtor: debtor,
          creditValue: +creditValue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setPhoneNumber("");
        setDebtorName("");
        setCreditValue("");
        dispatch(fetchDebtors());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingState(false));
  };

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj dłużnika!</Text>
      <RowInput
        text="Telefon dłużnika"
        value={phoneNumber}
        changeValueAction={setPhoneNumber}
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
        changeValueAction={setCreditValue}
        keyboardType="numeric"
      />
      <Button title="Pożycz hajsiwko" onPress={giveACredit} />
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

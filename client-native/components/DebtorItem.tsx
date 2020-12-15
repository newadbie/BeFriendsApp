import React, { FC } from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { fetchAndSelectDebtor } from "../slices/debtorsSlice";
import { DebtorData } from "../types";

export interface DebtorItemProps {
  debtor: DebtorData;
}

export const DebtorItem: FC<DebtorItemProps> = ({ debtor }) => {
  const dispatch = useDispatch();
  const selectDebtorHandler = () => {
    dispatch(fetchAndSelectDebtor(debtor));
  };

  const phoneNumber = debtor.phoneNumber
    .toString()
    .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ");

  return (
    <TouchableHighlight style={styles.container} onPress={selectDebtorHandler}>
      <>
        <Text style={styles.name}>{debtor.name}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#33b5e5",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    elevation: 5,
    borderRadius: 5,
    padding: 5,
  },
  name: {
    color: "#FFF",
    fontSize: 21,
    textAlign: "center",
  },
  phoneNumber: {
    color: "#CCCCCC",
    textAlign: "center",
    fontWeight: "bold",
  },
});

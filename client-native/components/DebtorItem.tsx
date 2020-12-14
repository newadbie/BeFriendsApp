import React, { FC } from "react";
import { TouchableHighlight,View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { selectDebtor } from "../slices/debtorsSlice";

export type debtorData = {
  _id?: null;
  name: string;
  phoneNumber: number;
  takenCredits: number;
  totalCredit: number;
};

export interface DebtorItemProps {
  debtor: debtorData;
}

export const DebtorItem: FC<DebtorItemProps> = ({ debtor }) => {
  const dispatch = useDispatch();
  const selectDebtorHandler = () => {
    dispatch(selectDebtor(debtor));
  }

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

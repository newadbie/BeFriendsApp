import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

export interface debtorData {
  _id?: null;
  name: string;
  phoneNumber: number;
  takenCredits: number;
  totalCredit: number;
}

export interface DebtorItemProps {
  debtor: debtorData;
}

export const DebtorItem: FC<DebtorItemProps> = ({debtor}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Imię dłużnika:</Text>
      <Text>{debtor.name}</Text>
      <Text style={styles.bold}>Numer telefonu</Text>
      <Text>{debtor.phoneNumber}</Text>
      <Text style={styles.bold}>Całkowita ilość pożyczek</Text>
      <Text>{debtor.takenCredits}</Text>
      <Text style={styles.bold}>Całkowita wartość pożyczek</Text>
      <Text>{debtor.totalCredit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  container: {
    marginTop:10,
    borderWidth:1,
    borderColor:"#CCC",
    padding:5
  }
});

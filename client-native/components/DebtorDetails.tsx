import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";
import { unSelectDebtor } from "../slices/debtorsSlice";
import { useDispatch } from "react-redux";
import { CreditList } from "./CreditList";
import { CreditData, DebtorData } from "../types";

interface Props {
  debtor: DebtorData;
  credits: Array<CreditData>;
}

export const DebtorDetails: FC<Props> = ({ debtor, credits }) => {
  const dispatch = useDispatch();

  const unselectHandler = () => {
    dispatch(unSelectDebtor());
  };

  return (
    <View style={styles.container}>
      <View style={styles.p15}>
        <Text style={[styles.center, styles.header]}>
          Informacje o <Text style={styles.bold}>{debtor.name}</Text>
        </Text>
      </View>
      <View>
        <Text style={[styles.text, styles.center]}>Numer telefonu:</Text>
        <Text style={[styles.bold, styles.text, styles.center]}>
          {debtor.phoneNumber}
        </Text>
      </View>
      <View>
        <Text style={styles.text}>
          Łączna wartość pożyczek
          <Text style={styles.bold}> {debtor.totalCredit} zł</Text>
        </Text>
      </View>
      <CreditList credits={credits} />
      <Button onPress={unselectHandler} title="Wróć" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 18,
  },
  header: {
    fontSize: 25,
  },
  center: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  p15: {
    padding: 15,
  },
});

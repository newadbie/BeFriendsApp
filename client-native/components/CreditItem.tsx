import React, { FC } from "react";
import { CreditData } from "../types";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";
import { widthPercentageToDP } from "react-native-responsive-screen";

interface Props {
  credit: CreditData;
}

export const CreditItem: FC<Props> = ({ credit }) => {
  const handler = () => {
    console.log("a");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{credit.creditName}</Text>
        <Text style={styles.text}>{credit.creditValue} zł</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Spłać" style={[styles.button]} onPress={handler} />
        <Button title="Przypomnij" style={[styles.button]} onPress={handler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  container: {
    padding: 10,
    marginBottom: 10,
    elevation: 1,
    backgroundColor: "rgba(30,144,255 ,.9)",
    height: 150,
  },
  button: {
    width: widthPercentageToDP("40%"),
    margin: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "#FFF",
    fontSize: 20
  },
});

import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { Button } from "./Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { getAuth } from "../selectors";

export const HomeScreen = ({ navigation }: any) => {
  const userName = useSelector(getAuth).userName;

  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader, styles.textCenter]}>
        Siemka
        <Text style={styles.textBold}> {userName}</Text>!
      </Text>
      <View style={{ marginTop: 40 }}>
        <Text style={[styles.textCenter, { fontSize: 20 }]}>
          Skoro tutaj jesteś, wybierz to po co przyszedłeś!
        </Text>
      </View>
      <View>
        <Button
          title="Pokaż dłużników"
          style={styles.button}
          onPress={() => Alert.alert("test")}
        />
        <Button
          title="Dodaj dłużnika"
          style={styles.button}
          onPress={() => { Alert.alert("test")}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp("75%"),
    marginLeft: wp("12.5%"),
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  textHeader: {
    marginTop: 20,
    fontSize: 35,
  },
  button: {
    marginTop: 10,
  },
  textCenter: {
    textAlign: "center",
  },
  textBold: {
    fontWeight: "bold",
  },
});

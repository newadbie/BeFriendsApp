import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export type RowInputProps = {
  text: string;
  value: string;
  changeValueAction(e: string): void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad'
};

export const RowInput: React.FC<RowInputProps> = ({
  text,
  value,
  keyboardType,
  changeValueAction,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.center}>{text}</Text>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType={keyboardType}
        onChangeText={changeValueAction}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 2,
  },
  input: {
    borderColor: "#CCC",
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  center: {
    textAlign: "center",
    fontSize: 20,
    paddingBottom: 5,
  },
});

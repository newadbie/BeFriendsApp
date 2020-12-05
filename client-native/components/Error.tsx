import React from "react";
import { View, StyleSheet, Text } from "react-native";

export type ErrorProps = {
  text: string;
};

export const Error: React.FC<ErrorProps> = ({ text }) => {
  if (text.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingVertical: 10,
    backgroundColor: '#ff4444',
    borderRadius: 2,
    elevation: 10,
    opacity: .8
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
});

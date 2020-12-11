import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const Spinner: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#0000ff" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    zIndex:100,
    overlayColor: 'rgba(255,255,255,1)',
    backgroundColor: 'rgba(255,255,255,.6)',
    top:0,
    bottom:0,
    left:0,
    right:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

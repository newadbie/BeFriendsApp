import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SpinerChildrenState } from "../components/WithLoading";

export const DebtorsScreen: React.FC<SpinerChildrenState> = ({
  navigation,
  setLoadingState,
  isLoading,
}) => {

  if (isLoading) {
    return null;
  }

  return (
    <View>
      <Text>Hello i work!</Text>
    </View>
  );
};

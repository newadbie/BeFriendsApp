import React, { FC } from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";
import { unSelectDebtor } from "../slices/debtorsSlice";
import { useDispatch } from "react-redux";

export const DebtorDetails: FC = () => {
  const dispatch = useDispatch();

  const unSelectHandler = () => {
    dispatch(unSelectDebtor());
  };

  return (
    <View>
      <Button onPress={unSelectHandler} title="Wróć" />
      <Text>Does it work?</Text>
    </View>
  );
};

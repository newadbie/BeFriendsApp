import React from "react";
import { View, Text } from "react-native";

import { widthPercentageToDP } from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import { FilterTypes } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { getDebtors } from "../selectors";
import { changeFilterType } from "../slices/debtorsSlice";

export const FilterPicker = () => {
  const dispatch = useDispatch();
  const filterType = useSelector(getDebtors).filterType;
  const filterTypeToPolish = (filterType: FilterTypes): string => {
    switch (filterType) {
      case "all":
        return "Wszystkie";
      case "paid":
        return "Zapłacone";
      case "unPaid":
        return "Nie zapłacone";
    }
    return "all";
  };

  const setFilterType = (newFilterType: FilterTypes) => {
    dispatch(changeFilterType(newFilterType));
  };
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Text
        style={{
          width: widthPercentageToDP("30%"),
          textAlign: "right",
          fontWeight: "bold",
        }}
      >
        Filtruj:
      </Text>
      <Picker
        selectedValue={filterType}
        onValueChange={(itemValue: any) => setFilterType(itemValue)}
        style={{ width: widthPercentageToDP("70%") }}
      >
        {Object.entries(FilterTypes).map((item, key) => {
          return (
            <Picker.Item
              label={filterTypeToPolish(item[1])}
              value={item[0]}
              key={key}
            />
          );
        })}
      </Picker>
    </View>
  );
};

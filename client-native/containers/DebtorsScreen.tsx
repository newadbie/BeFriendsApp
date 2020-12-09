import React, { SetStateAction, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SpinerChildrenState } from "../components/WithLoading";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { widthPercentageToDP } from "react-native-responsive-screen";

export const DebtorsScreen: React.FC<SpinerChildrenState> = ({
  navigation,
  setLoadingState,
  isLoading,
}) => {
  const filterTypes = {
    all: "Wszystkie",
    paided: "Nie spłacone długi",
    unPaided: "Spłacone długi",
  };

  const [filterType, setFilterType] = useState("");

  if (isLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Text style={{ width: widthPercentageToDP("50%"), textAlign: 'right', fontWeight: 'bold' }}>Filtruj:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={(itemValue: any) => setFilterType(itemValue)}
          style={{ width: widthPercentageToDP("50%") }}
        >
          {Object.entries(filterTypes).map((item, key) => {
            return <Picker.Item label={item[1]} value={item[0]} key={key} />;
          })}
        </Picker>
      </View>
      <View style={{ flex: 1 }}>
      </View>
    </View>
  );
};

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
    paid: "Nie spłacone długi",
    unPaid: "Spłacone długi",
  };

  const [filterType, setFilterType] = useState("all");
  const fetchData = async () => {
    try {
      console.log(filterType)
      const result = await axios.get("http://192.168.0.241:8080/getAllGivenCredits?payStatus=" + filterType);
      console.log(result.data)
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, [filterType])

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
        <Text style={{ width: widthPercentageToDP("30%"), textAlign: 'right', fontWeight: 'bold' }}>Filtruj:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={(itemValue: any) => setFilterType(itemValue)}
          style={{ width: widthPercentageToDP("70%")}}
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

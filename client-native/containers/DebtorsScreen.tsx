import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";

import { fetchDebtors, changeFilterType } from '../slices/debtorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { filterTypes } from "../types";

import { SpinerChildrenState } from "../components/WithLoading";
import { getDebtors } from '../selectors';
import { DebtorsList } from "../components/DebtorsList";

import { widthPercentageToDP } from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";

export const DebtorsScreen: React.FC<SpinerChildrenState> = ({
  setLoadingState,
}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getDebtors).isLoading;
  const debtors = useSelector(getDebtors).debtors;
  const filterType = useSelector(getDebtors).filterType;

  const setFilterType = (newFilterType : filterTypes) => {
    dispatch(changeFilterType(newFilterType))
  }

  const filterTypeToPolish = (filterType : filterTypes) : string => {
    switch (filterType) {
      case "all": return 'Wszystkie'; 
      case "paid": return "Zapłacone";
      case "unPaid": return "Nie zapłacone";
    }
    return "all";
  }

  useEffect(() => {
    setLoadingState(isLoading)
  }, [isLoading])

  useEffect(() => {
    dispatch(fetchDebtors());
  }, [filterType]);

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
          {Object.entries(filterTypes).map((item, key) => {
            return <Picker.Item label={filterTypeToPolish(item[1])} value={item[0]} key={key} />;
          })}
        </Picker>
      </View>
      <SafeAreaView>
        <DebtorsList debtors={debtors} />
      </SafeAreaView>
    </View>
  );
};

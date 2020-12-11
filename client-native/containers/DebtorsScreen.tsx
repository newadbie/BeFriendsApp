import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { SpinerChildrenState } from "../components/WithLoading";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { DebtorsList } from "../components/DebtorsList";
import { debtorData } from "../components/DebtorItem";

export const DebtorsScreen: React.FC<SpinerChildrenState> = ({
  navigation,
  setLoadingState,
  isLoading,
}) => {
  const filterTypes = {
    all: "Wszystkie",
    paid: "Spłacone długi",
    unPaid: "Nie spłacone długi",
  };

  const [filterType, setFilterType] = useState("all");
  const [debtors, setDebtorsState] = useState<debtorData[]>([]);

  const fetchData = async () => {
    try {
      setDebtorsState([]);
      const {
        data,
      } = await axios.get(
        "http://192.168.0.241:8080/getAllGivenCredits?payStatus=" + filterType,
        { withCredentials: true }
      );
        setDebtorsState(data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoadingState(true);
    fetchData().then(() => {
      setLoadingState(false);
    });
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
            return <Picker.Item label={item[1]} value={item[0]} key={key} />;
          })}
        </Picker>
        </View>
        <SafeAreaView>
          <ScrollView>
            <DebtorsList debtors={debtors} />
          </ScrollView>
        </SafeAreaView>
      
    </View>
  );
};

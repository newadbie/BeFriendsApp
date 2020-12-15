import React, { FC } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { CreditData } from "../types";
import { CreditItem } from "./CreditItem";

interface Props {
  credits: Array<CreditData>;
}

export const CreditList: FC<Props> = ({ credits }) => {
  const renderItem = ({ item }: { item: CreditData }) => {
    return <CreditItem credit={item} />;
  };

  return (
    <SafeAreaView style={{height: 300}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10, marginBottom: 20}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={credits}
      />
    </SafeAreaView>
  );
};

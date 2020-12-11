import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { debtorData, DebtorItem } from "./DebtorItem";
import { widthPercentageToDP } from "react-native-responsive-screen";

export interface DebtorsListProps {
  debtors: Array<debtorData>;
}

export const DebtorsList: FC<DebtorsListProps> = ({ debtors }) => {
  const debtorList = debtors.map((obj: any, index) => {
      return <DebtorItem debtor={obj} key={index}/>;
  });
  return <View style={styles.container}>{debtorList}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP("75%"),
        marginLeft: widthPercentageToDP("12.5%"),
        marginTop: 10
    }
})
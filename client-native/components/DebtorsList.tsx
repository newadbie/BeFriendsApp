import React, { FC } from "react";
import { StyleSheet, FlatList} from "react-native";
import { debtorData, DebtorItem } from "./DebtorItem";
import { widthPercentageToDP } from "react-native-responsive-screen";

export interface DebtorsListProps {
  debtors: Array<debtorData>;
}

export const DebtorsList: FC<DebtorsListProps> = ({ debtors }) => {
  const renderItem = ({ item }: { item: debtorData }) => {
    return <DebtorItem debtor={item} />;
  };
  return (
    <FlatList
    style={styles.container}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      data={debtors}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP("75%"),
    marginLeft: widthPercentageToDP("12.5%"),
    marginTop: 10,
    marginBottom:60
  },
});

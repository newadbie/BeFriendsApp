import React, { FC } from "react";
import { StyleSheet, FlatList } from "react-native";
import { debtorData, DebtorItem } from "./DebtorItem";

export interface DebtorsListProps {
  debtors: Array<debtorData>;
}

export const DebtorsList: FC<DebtorsListProps> = ({ debtors }) => {
  const renderItem = ({ item }: { item: debtorData }) => {
    return <DebtorItem debtor={item} />;
  };
  
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.container}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      data={debtors}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 5,
    marginBottom: 60,
  },
});

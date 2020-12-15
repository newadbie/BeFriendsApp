import React, { FC } from "react";
import { StyleSheet, FlatList } from "react-native";
import { DebtorItem } from "./DebtorItem";
import {DebtorData} from '../types';

export interface DebtorsListProps {
  debtors: Array<DebtorData>;
}

export const DebtorsList: FC<DebtorsListProps> = ({ debtors }) => {
  const renderItem = ({ item }: { item: DebtorData }) => {
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

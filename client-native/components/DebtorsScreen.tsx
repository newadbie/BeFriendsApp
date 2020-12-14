import React, { FC } from "react";
import { SafeAreaView } from "react-native";

import { debtorData } from "./DebtorItem";
import { FilterPicker } from "./Picker";
import { DebtorsList } from "../components/DebtorsList";

type Props = {
    debtors: Array<debtorData>
}
export const DebtorsScreen : FC<Props> = ({ debtors }) => {
  return (
    <>
      <FilterPicker />
      <SafeAreaView>
        <DebtorsList debtors={debtors} />
      </SafeAreaView>
    </>
  );
};

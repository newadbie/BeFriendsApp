import React, { FC } from "react";
import { SafeAreaView } from "react-native";

import { DebtorData } from "../types";
import { FilterPicker } from "./Picker";
import { DebtorsList } from "../components/DebtorsList";

type Props = {
    debtors: Array<DebtorData>
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

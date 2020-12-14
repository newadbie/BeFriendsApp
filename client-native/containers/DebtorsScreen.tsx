import React, { useEffect } from "react";
import { View } from "react-native";
import { DebtorsScreen as DS } from "../components/DebtorsScreen";
import { DebtorDetails } from "../components/DebtorDetails";
import { useSelector, useDispatch } from "react-redux";

import { SpinerChildrenState } from "../components/WithLoading";
import { getDebtors } from "../selectors";
import { fetchDebtors } from "../slices/debtorsSlice";

export const DebtorsScreen: React.FC<SpinerChildrenState> = ({
  setLoadingState,
}) => {
  const isLoading = useSelector(getDebtors).isLoading;
  const isDebtorSelected = useSelector(getDebtors).selectedDebtor;
  const debtors = useSelector(getDebtors).debtors;
  const filterType = useSelector(getDebtors).filterType;

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchDebtors());
  }, [ ,filterType]);

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <View style={{ flex: 1 }}>
      {isDebtorSelected ? <DebtorDetails /> : <DS debtors={debtors} />}
    </View>
  );
};

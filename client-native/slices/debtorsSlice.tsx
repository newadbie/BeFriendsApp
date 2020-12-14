import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DebtorState, filterTypes } from "../types";
import axios from "axios";
import { debtorData } from "../components/DebtorItem";

export const initialState: DebtorState = {
  debtors: [],
  isLoading: false,
  filterType: filterTypes.all,
};

const debtorSlice = createSlice({
  name: "debtors",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    changeFilterType: (state, { payload }: PayloadAction<filterTypes>) => {
      state.filterType = payload;
    },
    loadDebtors: (state, { payload }: PayloadAction<Array<debtorData>>) => {
      state.debtors = payload;
    },
  },
});

export const {
  loadDebtors,
  startLoading,
  stopLoading,
  changeFilterType,
} = debtorSlice.actions;

export const fetchDebtors = () => async (dispatch: any, getState: any) => {
  dispatch(startLoading());
  try {
    const { filterType } = getState()["debtorState"];
    const result = await axios.get(
      "http://192.168.0.241:8080/getAllGivenCredits?payStatus=" + filterType
    );
    dispatch(loadDebtors(result.data));
    dispatch(stopLoading());
  } catch (err) {
    console.log(err);
  }
};

export default debtorSlice.reducer;

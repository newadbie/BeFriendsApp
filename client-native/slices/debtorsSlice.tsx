import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreditData, DebtorState, FilterTypes } from "../types";
import axios from "axios";
import { DebtorData } from "../types";

export const initialState: DebtorState = {
  debtors: [],
  isLoading: false,
  filterType: FilterTypes.all,
  selectedDebtor: null,
};

type PayloadParams = {
  data: DebtorData;
  credits: Array<CreditData>;
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
    changeFilterType: (state, { payload }: PayloadAction<FilterTypes>) => {
      state.filterType = payload;
    },
    loadDebtors: (state, { payload }: PayloadAction<Array<DebtorData>>) => {
      state.debtors = payload;
    },
    selectDebtor: (state, { payload }: PayloadAction<PayloadParams>) => {
      state.selectedDebtor = payload;
    },
    unSelectDebtor: (state) => {
      state.selectedDebtor = null;
    },
  },
});

export const {
  loadDebtors,
  startLoading,
  stopLoading,
  changeFilterType,
  selectDebtor,
  unSelectDebtor,
} = debtorSlice.actions;

export const fetchDebtors = () => async (dispatch: any, getState: any) => {
  dispatch(startLoading());
  dispatch(unSelectDebtor());
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

export const fetchAndSelectDebtor = (debtor: DebtorData) => async (
  dispatch: any
) => {
  dispatch(startLoading());
  try {
    const result = await axios.post(
      "http://192.168.0.241:8080/getDebtorCredits",
      {
        id: debtor._id,
      }
    );
    const credits: Array<CreditData> = result.data.credits;
    const payload: PayloadParams = {
      data: debtor,
      credits: credits,
    };
    dispatch(selectDebtor(payload));
  } catch (err) {
    console.log(err);
  }
  dispatch(stopLoading());
};

export default debtorSlice.reducer;

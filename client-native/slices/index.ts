import { combineReducers, Reducer } from "redux";
import { RootState } from "../types";
import debtorReducer from "../slices/debtorsSlice";
import authReducer from "../slices/authSlice";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  debtorState: debtorReducer
});

export default rootReducer;
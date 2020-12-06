import { combineReducers, Reducer } from "redux";
import { RootState } from "../types";
import authReducer from "../slices/authSlice";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
});

export default rootReducer;

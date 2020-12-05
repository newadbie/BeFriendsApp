import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types";

export const initialState: AuthState = {
  //   currentUser: {},
  userEmail: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.userEmail = payload.userEmail;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      //   state.currentUser = {};
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

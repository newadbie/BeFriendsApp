import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types";

export const initialState: AuthState = {
  //   currentUser: {},
  userEmail: "",
  userName: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.userEmail = payload.userEmail;
      state.userName = payload.userName; 
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = "";
      state.userEmail = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

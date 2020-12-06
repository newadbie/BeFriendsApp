import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from '../types';

export const initialState : AuthState = {
  currentUser: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state/*-, { payload }: PayloadAction<any>*/) => {
      // state.currentUser = payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = {};
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
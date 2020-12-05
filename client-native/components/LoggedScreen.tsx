import React from "react";
import axios from "axios";
import {HomeScreen} from '../containers/HomeScreen';

import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

import { SpinerChildrenState } from "./WithLoading";


import {Text, View} from 'react-native'

export const LoggedScreen : React.FC<SpinerChildrenState> = ({
  setLoadingState,
}) => {
  
  const dispatch = useDispatch();
  const signOut = () => {
    setLoadingState(true);
    axios
      .post("http://192.168.0.241:8080/logout")
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingState(false));
  };

  return (
    <>
    <Text style={{marginTop: 30}}>ALO AafdsfdsfLO</Text>
    </>
  );
};


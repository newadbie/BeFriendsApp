import React, { useEffect } from "react";
import axios from "axios";
import { Text } from "react-native";
import { SpinerChildrenState } from "./WithLoading";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

export const LogoutScreen: React.FC<SpinerChildrenState> = ({
  setLoadingState,
  navigation,
}: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setLoadingState(true);
    axios
      .post("http://192.168.0.241:8080/logout", {}, { withCredentials: true })
      .then(() => {
        setLoadingState(false);
        dispatch(logout());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingState(false));
  });

  return <></>;
};

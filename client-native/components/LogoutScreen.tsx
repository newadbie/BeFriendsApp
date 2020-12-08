import React, { useEffect } from "react";
import axios from "axios";
import { SpinerChildrenState } from "./WithLoading";
import { useDispatch } from "react-redux";
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
        dispatch(logout());
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <></>;
};

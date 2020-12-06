import React from "react";
import { HomeScreen as Home } from "../containers/HomeScreen";
import { WithLoading } from "../components/WithLoading";
import { LoginScreen as Login } from "../containers/LoginScreen";
import { LogoutScreen as Logout } from "../components/LogoutScreen";

export const HomeScreen = ({ navigation }: any) => (
  <WithLoading Component={Home} navigation={navigation} />
);

export const LoginScreen = ({ navigation }: any) => (
  <WithLoading Component={Login} navigation={navigation} />
);

export const LogoutScreen = ({ navigation }: any) => (
  <WithLoading Component={Logout} navigation={navigation} />
);

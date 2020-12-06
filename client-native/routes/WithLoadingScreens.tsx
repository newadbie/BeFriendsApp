import React from "react";
import { HomeScreen as Home } from "../components/HomeScreen";
import { WithLoading } from "../components/WithLoading";
import { LoginScreen as Login } from "../containers/LoginScreen";
import { LogoutScreen as Logout } from "../components/LogoutScreen";
import { DebtorsScreen as Debtors} from '../containers/DebtorsScreen';

export const HomeScreen = ({ navigation }: any) => (
  <WithLoading Component={Home} navigation={navigation} />
);

export const LoginScreen = ({ navigation }: any) => (
  <WithLoading Component={Login} navigation={navigation} />
);

export const LogoutScreen = ({ navigation }: any) => (
  <WithLoading Component={Logout} navigation={navigation} />
);

export const DebtorsScreen = ({navigation} : any) => (
  <WithLoading Component={Debtors} navigation={navigation} />
)
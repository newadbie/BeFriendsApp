import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LogoutScreen } from "../routes/WithLoadingScreens";

const Tab = createBottomTabNavigator();

export function LoggedScreen() {
  return (
      <Tab.Navigator tabBarOptions={{labelStyle: {
        fontSize: 16,
        margin:0,
        padding:0,
      }, tabStyle: {justifyContent: 'center'}}} sceneContainerStyle={{width:300}} initialRouteName="Strona Glowna">
        <Tab.Screen component={HomeScreen} name="Strona Glowna" />
        <Tab.Screen component={LogoutScreen} name="Logout" />
        <Tab.Screen component={LogoutScreen} name="Logout2" />
        <Tab.Screen component={LogoutScreen} name="Logout3" />
        <Tab.Screen component={LogoutScreen} name="Logout4" />
      </Tab.Navigator>
  );
};

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LogoutScreen, DebtorsScreen, GiveCreditScreen } from "../routes/WithLoadingScreens";
import Icon from "react-native-ionicons";

const Tab = createBottomTabNavigator();

export function LoggedScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
        },
        tabStyle: { justifyContent: "center" },
        style: {padding:5}
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Główna") {
            iconName = 'home'
          } else if (route.name === "Pożycz") {
            iconName = focused ? 'add-circle' : 'add-circle-outline'
          } else if (route.name === 'Wyloguj') {
            iconName = 'log-out';
          } else if (route.name === 'Dłużnicy') {
            iconName = focused ? 'list-box' : 'list'
          }
          return <Icon name={iconName} size={size} color={color} />
        },
      })}
      initialRouteName="Główna"
    >
      <Tab.Screen component={HomeScreen} name="Główna" />
      <Tab.Screen component={GiveCreditScreen} name="Pożycz" />
      <Tab.Screen component={DebtorsScreen} name="Dłużnicy" />
      <Tab.Screen component={LogoutScreen} name="Wyloguj" />
    </Tab.Navigator>
  );
}

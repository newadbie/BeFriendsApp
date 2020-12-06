import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LogoutScreen } from "../routes/WithLoadingScreens";
import Icon from "react-native-ionicons";

const Tab = createBottomTabNavigator();

export function LoggedScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 16,
          margin: 0,
          padding: 0,
        },
        tabStyle: { justifyContent: "center" },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Strona Glowna") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (route.name === 'Logout') {
            iconName = focused ? 'list-box' : 'list';
          }

          return <Icon name={iconName} size={size} color={color} />
        },
      })}
      initialRouteName="Strona Glowna"
    >
      <Tab.Screen component={HomeScreen} name="Strona Glowna" />
      <Tab.Screen component={LogoutScreen} name="Logout" />
    </Tab.Navigator>
  );
}

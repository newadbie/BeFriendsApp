import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import {useSelector } from 'react-redux';
import { getAuth } from '../selectors';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
export const HomeScreen = ({ navigation } : any) => {
  const isAuthorizated = useSelector(getAuth).isAuthenticated;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{isAuthorizated ? "Jest" : "Nie ma"} alo alo</Text>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      width: wp("75%"),
      alignContent: "center",
      justifyContent: "center",
    },
  });
  

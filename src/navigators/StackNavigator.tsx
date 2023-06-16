import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpIndex from "../screens/SignUp/Index";
import { RootStackParamList } from "../../types";
import TabNavigator from "./TabNavigator";
import { storeTokenGlobal, getTokenGlobal, clearToken } from "../AsyncGlobal";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { set } from "mobx";
import Manage from "../screens/Manage/Manage";
import ManageDrawer from "../screens/Manage/ManageDrawer";
import { useCounterStore } from "../../MobX/TodoStore";
const Stack = createStackNavigator<RootStackParamList>();
const LoggedInStack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  // clearToken();

  const Mobx = useCounterStore();
  console.log("StackNaviMobx", Mobx.access_token);

  return (
    <>
      {Mobx.access_token ? (
        <LoggedInStack.Navigator>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ManageDrawer" component={ManageDrawer} />
        </LoggedInStack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignUpIndex" component={SignUpIndex} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

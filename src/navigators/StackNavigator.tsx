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
import { observer } from "mobx-react";
import LoginIndex from "../screens/Login/Index";
import Details from "../screens/Manage/ManageDrawerScreens/Details";
import TemplateHistory from "../screens/Manage/ManageDrawerScreens/TemplateHistory";
import AddSignature from "../screens/Signatures/Screens/AddSignature";
const Stack = createStackNavigator<RootStackParamList>();
const LoggedInStack = createStackNavigator<RootStackParamList>();

const StackNavigator = observer(() => {
  // clearToken();

  const Mobx = useCounterStore();
  console.log("StackNaviMobx", Mobx.access_token);

  return (
    <>
      {Mobx.access_token ? (
        <LoggedInStack.Navigator>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ManageDrawer" component={ManageDrawer} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="TemplateHistory" component={TemplateHistory} />
          <Stack.Screen name="AddSignature" component={AddSignature} />
        </LoggedInStack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="LoginIndex">
          <Stack.Screen name="LoginIndex" component={LoginIndex} />
          <Stack.Screen name="SignUpIndex" component={SignUpIndex} />
        </Stack.Navigator>
      )}
    </>
  );
});

export default StackNavigator;

const styles = StyleSheet.create({});

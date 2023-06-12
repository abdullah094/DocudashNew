import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "../screens/SignUp/Index";
import { RootStackParamList } from "../../types";
import TabNavigator from "./TabNavigator";
import { storeTokenGlobal, getTokenGlobal } from "../AsyncGlobal";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { set } from "mobx";
const Stack = createStackNavigator<RootStackParamList>();
const LoggedInStack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [t, setT] = useState<string>("");

  const fetchData = async () => {
    const _token = await getTokenGlobal();
    setT(_token);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(t);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Step1 from "./Screens/Step1";
import Step2 from "./Screens/Step2";

const LoginStack = createStackNavigator();

const Index = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Step1" component={Step1} />
      <LoginStack.Screen name="Step2" component={Step2} />
    </LoginStack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});

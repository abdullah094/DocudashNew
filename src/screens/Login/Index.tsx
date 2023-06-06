import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { createStackNavigator } from "@react-navigation/stack";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { StackNavigationProp } from "@react-navigation/stack";

const LoginStack = createStackNavigator();

const Index = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Step1" component={Step1} />
      <LoginStack.Screen name="Step2" component={Step2} />
      <LoginStack.Screen name="Step3" component={Step3} />
      <LoginStack.Screen name="Step4" component={Step4} />
    </LoginStack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});

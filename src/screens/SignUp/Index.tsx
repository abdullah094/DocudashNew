import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import EmailScreen from "./Email";
import UserInfoScreen from "./UserInfo";
import PasswordScreen from "./Password";
import { createStackNavigator } from "@react-navigation/stack";
import OptScreen from "./OptScreen";
import SetPasswordScreen from "./SetPassword";
import { StackNavigationProp } from "@react-navigation/stack";
import { getData, clearAsync } from "./AsynFunc";
import { observer } from "mobx-react-lite";
import { useCounterStore } from "../../../MobX/TodoStore";
import IndustriesScreen from "./Industries";
import { SignUpStackParamList } from "../../../types";

const LoginStack = createStackNavigator<SignUpStackParamList>();

const Index = () => {
  // clearAsync();

  const [step, setStep] = useState<keyof SignUpStackParamList | undefined>(
    "Index"
  );

  useEffect(() => {
    getData().then((response) => {
      console.log(response);

      if (response) {
        setStep(response as keyof SignUpStackParamList | undefined);
      }
    });
  }, []);
  return (
    <LoginStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={step}
    >
      <LoginStack.Screen name="Index" component={EmailScreen} />
      <LoginStack.Screen name="Step1" component={UserInfoScreen} />
      <LoginStack.Screen name="Step2" component={OptScreen} />
      <LoginStack.Screen name="Step3" component={SetPasswordScreen} />
      <LoginStack.Screen name="Step4" component={IndustriesScreen} />
      <LoginStack.Screen name="Step5" component={PasswordScreen} />
    </LoginStack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});

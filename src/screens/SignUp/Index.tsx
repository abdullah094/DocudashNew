import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { createStackNavigator } from "@react-navigation/stack";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { StackNavigationProp } from "@react-navigation/stack";
import { getData, clearAsync } from "./AsynFunc";
import { observer } from "mobx-react-lite";
import { useCounterStore } from "../../../MobX/TodoStore";
import Step5 from "./Step5";
import { SignupStackParamList } from "../../../types";

const LoginStack = createStackNavigator<SignupStackParamList>();

const Index = () => {
  // clearAsync();

  const [step, setStep] = useState<keyof SignupStackParamList | undefined>(
    "Step1"
  );
  const [bool, setBool] = useState<boolean | null | string>(false);

  const result = getData();
  result.then((response) => {
    if (response) {
      setStep(response as keyof SignupStackParamList | undefined);
    }
    setBool(true);
  });

  if (bool)
    return (
      <LoginStack.Navigator
        screenOptions={{ headerShown: true }}
        initialRouteName={step}
      >
        <LoginStack.Screen name="Step1" component={Step1} />
        <LoginStack.Screen name="Step2" component={Step2} />
        <LoginStack.Screen name="Step3" component={Step3} />
        <LoginStack.Screen name="Step4" component={Step4} />
        <LoginStack.Screen name="Step5" component={Step5} />
      </LoginStack.Navigator>
    );
  else {
    return <></>;
  }
};

export default Index;

const styles = StyleSheet.create({});

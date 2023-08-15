import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SignUpStackParamList } from '@types';
import { getData } from '@utils/AsyncFunc';
import EmailScreen from '@screens/signup/Email';
import IndustriesScreen from '@screens/signup/Industries';
import OptScreen from '@screens/signup/OptScreen';
import PasswordScreen from '@screens/signup/Password';
import SetPasswordScreen from '@screens/signup/SetPassword';
import UserInfoScreen from '@screens/signup/UserInfo';
import Loader from '@components/Loader';

const LoginStack = createStackNavigator<SignUpStackParamList>();
export default function LoginStackNavigator() {
  // clearAsync();

  const [step, setStep] = useState<keyof SignUpStackParamList | undefined>('Index');
  useEffect(() => {
    getData().then((response) => {
      if (response) {
        setStep(response as keyof SignUpStackParamList | undefined);
      }
    });
  }, []);
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={step}>
      <LoginStack.Screen name="Index" component={EmailScreen} />
      <LoginStack.Screen name="Step1" component={UserInfoScreen} />
      <LoginStack.Screen name="Step2" component={OptScreen} />
      <LoginStack.Screen name="Step3" component={SetPasswordScreen} />
      <LoginStack.Screen name="Step4" component={IndustriesScreen} />
      <LoginStack.Screen name="Step5" component={PasswordScreen} />
    </LoginStack.Navigator>
  );
}

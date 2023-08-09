import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SignUpStackParamList } from '../../../types';
import { getData } from './AsynFunc';
import EmailScreen from './Email';
import IndustriesScreen from './Industries';
import OptScreen from './OptScreen';
import PasswordScreen from './Password';
import SetPasswordScreen from './SetPassword';
import UserInfoScreen from './UserInfo';

const LoginStack = createStackNavigator<SignUpStackParamList>();

const Index = () => {
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
};

export default Index;

const styles = StyleSheet.create({});

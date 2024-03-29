import { createStackNavigator } from '@react-navigation/stack';
import Browser from '@screens/Browser';
import Address from '@screens/NotarySignUp/Address';
import EmailScreen from '@screens/SignUp1/Email';
import IndustriesScreen from '@screens/SignUp1/Industries';
import NotaryOrUser from '@screens/SignUp1/NotaryOrUser';
import OptScreen from '@screens/SignUp1/OptScreen';
import PasswordScreen from '@screens/SignUp1/Password';
import SetPasswordScreen from '@screens/SignUp1/SetPassword';
import UserInfoScreen from '@screens/SignUp1/UserInfo';
import { SignUpStackParamList } from '@type/index';
import { getData } from '@utils/AsyncFunc';
import React, { useEffect, useState } from 'react';

const LoginStack = createStackNavigator<SignUpStackParamList>();
export default function LoginStackNavigator() {
  // clearAsync();

  const [step, setStep] = useState<keyof SignUpStackParamList | undefined>('NotaryOrUser');
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

      <LoginStack.Screen name="Browser" component={Browser} />
    </LoginStack.Navigator>
  );
}

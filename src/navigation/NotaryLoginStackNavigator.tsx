import { createStackNavigator } from '@react-navigation/stack';
import Browser from '@screens/Browser';
import Address from '@screens/NotarySignUp/Address';
import EmailScreen from '@screens/NotarySignUp/Email';
import IndustriesScreen from '@screens/SignUp1/Industries';
import NotaryOrUser from '@screens/SignUp1/NotaryOrUser';
import OptScreen from '@screens/NotarySignUp/OptScreen';
import PasswordScreen from '@screens/SignUp1/Password';
import SetPasswordScreen from '@screens/NotarySignUp/Password';
import UserInfoScreen from '@screens/NotarySignUp/UserInfo';
import { SignUpStackParamList } from '@type/index';
import { getData } from '@utils/AsyncFunc';
import React, { useEffect, useState } from 'react';
import RON_DocUpload from '@screens/NotarySignUp/RON_DocUpload';

const LoginStack = createStackNavigator<SignUpStackParamList>();
export default function NotaryLoginStackNavigator() {
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
      <LoginStack.Screen name="Step4" component={Address} />
      <LoginStack.Screen name="Step5" component={RON_DocUpload} />
      <LoginStack.Screen name="Step6" component={PasswordScreen} />

      <LoginStack.Screen name="Browser" component={Browser} />
    </LoginStack.Navigator>
  );
}

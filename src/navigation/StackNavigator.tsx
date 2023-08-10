import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import DrawerNavigator from './DrawerNavigator';
import { RootStackParamList } from '../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectAccessToken, setAccessToken } from '@stores/Slices';
import LoginStackNavigator from './LoginStackNavigator';
import { getTokenGlobal } from '@utils/AsyncGlobal';
import AddSignature from '@screens/Signatures/AddSignature';
import Signatures from '@screens/Signatures/List';
import AddStamp from '@screens/Stamp/AddStamps';
import Stamps from '@screens/Stamp/List';
import Browser from '@screens/Browser';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getTokenGlobal();
      if (!token) {
        dispatch(logoutUser());
      } else {
        dispatch(setAccessToken(token));
      }
    };
    getAccessToken();
  }, []);

  const user = useSelector(selectAccessToken);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen name="Signatures" component={Signatures} />
          <Stack.Screen name="AddSignature" component={AddSignature} />
          <Stack.Screen name="Stamps" component={Stamps} />
          <Stack.Screen name="AddStamp" component={AddStamp} />
          <Stack.Screen name="Browser" component={Browser} />
          {/* <Stack.Screen name="ManageDrawer" component={ManageDrawer} /> */}
          {/* <Stack.Screen name="TemplateHistory" component={TemplateHistory} /> */}
        </Stack.Group>
      ) : (
        <Stack.Screen name="SignUpIndex" component={LoginStackNavigator} />
      )}
    </Stack.Navigator>
  );
}

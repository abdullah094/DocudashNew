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
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="SignUpIndex" component={LoginStackNavigator} />
      )}
    </Stack.Navigator>
  );
}

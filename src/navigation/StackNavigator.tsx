import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import DrawerNavigator from './DrawerNavigator';
import { RootStackParamList } from '../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectAccessToken, setAccessToken } from '@stores/Slices';
import LoginStackNavigator from './LoginStackNavigator';
import { clearToken, getTokenGlobal } from '@utils/AsyncGlobal';
import AddSignature from '@screens/Signatures/AddSignature';
import Signatures from '@screens/Signatures/List';
import AddStamp from '@screens/Stamp/AddStamps';
import Stamps from '@screens/Stamp/List';
import Browser from '@screens/Browser';
import Details from '@screens/Manage/Details';
import Edit from '@screens/Manage/Edit';
import DocumentEditor from '@screens/Manage/DocumentEditor';
import Loader from '@components/Loader';
import Profile from '@screens/Profile';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  // clearToken();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const getAccessToken = async () => {
      const token = await getTokenGlobal();
      setLoading(false);
      if (!token) {
        dispatch(logoutUser());
      } else {
        dispatch(setAccessToken(token));
      }
    };
    getAccessToken();
  }, []);
  const user = useSelector(selectAccessToken);

  if (loading) {
    return <Loader />;
  }
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
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="DocumentEditor" component={DocumentEditor} />
          <Stack.Screen name="Profile" component={Profile} />
          {/* <Stack.Screen name="ManageDrawer" component={ManageDrawer} /> */}
          {/* <Stack.Screen name="TemplateHistory" component={TemplateHistory} /> */}
        </Stack.Group>
      ) : (
        <Stack.Screen name="SignUpIndex" component={LoginStackNavigator} />
      )}
    </Stack.Navigator>
  );
}

import Loader from '@components/Loader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Browser from '@screens/Browser';
import Details from '@screens/Manage/Details';
import DocumentEditor from '@screens/Manage/DocumentEditor';
import Edit from '@screens/Manage/Edit';
import Profile from '@screens/Profile';
import AddSignature from '@screens/Signatures/AddSignature';
import Signatures from '@screens/Signatures/List';
import AddStamp from '@screens/Stamp/AddStamps';
import Stamps from '@screens/Stamp/List';
import { logoutUser, selectAccessToken, setAccessToken } from '@stores/Slices';
import { getTokenGlobal } from '@utils/AsyncGlobal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types/navigation';
import DrawerNavigator from './DrawerNavigator';
import LoginStackNavigator from './LoginStackNavigator';
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

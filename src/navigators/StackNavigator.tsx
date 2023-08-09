import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useCounterStore } from '../../MobX/TodoStore';
import { RootStackParamList } from '../../types';

import ManageDrawer from '../screens/Manage/ManageDrawer';
import TemplateHistory from '../screens/Manage/ManageDrawerScreens/TemplateHistory';
import SignUpIndex from '../screens/SignUp/Index';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = observer(() => {
  // clearToken();

  const Mobx = useCounterStore();
  console.log('StackNaviMobx', Mobx.access_token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {Mobx.access_token ? (
        <Stack.Group>
          <Stack.Screen name="DashboardDrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="ManageDrawer" component={ManageDrawer} />
          <Stack.Screen name="TemplateHistory" component={TemplateHistory} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="SignUpIndex" component={SignUpIndex} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
});

export default StackNavigator;

const styles = StyleSheet.create({});

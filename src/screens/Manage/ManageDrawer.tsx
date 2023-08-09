import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inbox from './ManageDrawerScreens/Inbox';
import CustomDrawerManage from './CustomDrawerManage';
import { ManageDrawerParamList, ManageDrawerScreenProps } from '../../../types';

const Drawer = createDrawerNavigator<ManageDrawerParamList>();
const ManageDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      drawerContent={(props) => <CustomDrawerManage />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Inbox" component={Inbox} />
    </Drawer.Navigator>
  );
};

export default ManageDrawer;

const styles = StyleSheet.create({});

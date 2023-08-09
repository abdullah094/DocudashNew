import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ManageDrawerParamList } from '../../../types';
import DocumentEditor from '../DocumentEditor/Index';
import CustomDrawerManage from './CustomDrawerManage';
import Details from './ManageDrawerScreens/Details';
import Edit from './ManageDrawerScreens/Edit';
import Inbox from './ManageDrawerScreens/Inbox';

const Drawer = createDrawerNavigator<ManageDrawerParamList>();
const ManageDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      drawerContent={(props) => <CustomDrawerManage />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Inbox" component={Inbox} />
      <Drawer.Screen name="Edit" component={Edit} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen name="DocumentEditor" component={DocumentEditor} />
    </Drawer.Navigator>
  );
};

export default ManageDrawer;

const styles = StyleSheet.create({});

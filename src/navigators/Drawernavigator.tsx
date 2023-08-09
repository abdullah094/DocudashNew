import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import { DashBoardDrawerParamList } from '../../types';
import CustomDrawer from '../screens/DashBoard/CustomDrawer';
import Browser from '../screens/DashboardDrawerScreens/Browser';
import Dashboard from '../screens/DashboardDrawerScreens/Dashboard';
import Profile from '../screens/Manage/Profile';
import Signatures from '../screens/Signatures/Index';
import AddSignature from '../screens/Signatures/Screens/AddSignature';
import Stamps from '../screens/Stamps/Index';
import AddStamp from '../screens/Stamps/Screens/AddStamps';
import Template from '../screens/Template/Index';
const Drawer = createDrawerNavigator<DashBoardDrawerParamList>();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props) => <CustomDrawer />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Template" component={Template} />
      <Drawer.Screen name="Signatures" component={Signatures} />
      <Drawer.Screen name="Stamps" component={Stamps} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Browser" component={Browser} />
      <Drawer.Screen name="AddSignature" component={AddSignature} />
      <Drawer.Screen name="AddStamp" component={AddStamp} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});

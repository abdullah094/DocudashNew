import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { DashBoardDrawerParamList } from '../../types';
import CustomDrawer from '../screens/DashBoard/CustomDrawer';
import Browser from '../screens/DashboardDrawerScreens/Browser';
import Dashboard from '../screens/DashboardDrawerScreens/Dashboard';
import Profile from '../screens/Manage/Profile';
import Signatures from '../screens/Signatures/Index';
import Stamps from '../screens/Stamps/Index';

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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/DashboardDrawerScreens/Dashboard";
import Template from "../screens/DashboardDrawerScreens/Template";
import Manage from "../screens/Manage/Manage";
import Dashboard from "../screens/DashboardDrawerScreens/Dashboard";
import CustomDrawer from "../screens/DashBoard/CustomDrawer";
const Drawer = createDrawerNavigator();
const Drawernavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawer />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Template" component={Template} />
    </Drawer.Navigator>
  );
};

export default Drawernavigator;

const styles = StyleSheet.create({});

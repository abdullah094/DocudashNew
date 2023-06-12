import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/DrawerScreens/Home";
import Template from "../screens/DrawerScreens/Template";
import Manage from "../screens/DrawerScreens/Manage";
import Dashboard from "../screens/DashBoard/Dashboard";
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
      <Drawer.Screen name="Manage" component={Manage} />
    </Drawer.Navigator>
  );
};

export default Drawernavigator;

const styles = StyleSheet.create({});

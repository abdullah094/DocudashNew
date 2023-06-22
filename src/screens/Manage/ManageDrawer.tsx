import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Inbox from "./ManageDrawerScreens/Inbox";
import Sent from "./ManageDrawerScreens/Sent";
import Draft from "./ManageDrawerScreens/Draft";
import Starred from "./ManageDrawerScreens/Starred";
import DeleteMessages from "./ManageDrawerScreens/DeleteMessages";
import CustomDrawerManage from "./CustomDrawerManage";

const Drawer = createDrawerNavigator();
const ManageDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      drawerContent={(props) => <CustomDrawerManage />}
    >
      <Drawer.Screen name="Inbox" component={Inbox} />
    </Drawer.Navigator>
  );
};

export default ManageDrawer;

const styles = StyleSheet.create({});

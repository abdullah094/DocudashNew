import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpIndex from "../screens/SignUp/Index";
import { RootStackParamList } from "../../types";
import TabNavigator from "./TabNavigator";
import ManageDrawer from "../screens/Manage/ManageDrawer";
import { useCounterStore } from "../../MobX/TodoStore";
import { observer } from "mobx-react";
import Edit from "../screens/Manage/ManageDrawerScreens/Edit";
import AddSignature from "../screens/Signatures/Screens/AddSignature";
import Details from "../screens/Manage/ManageDrawerScreens/Details";
import TemplateHistory from "../screens/Manage/ManageDrawerScreens/TemplateHistory";
import Drawernavigator from "./Drawernavigator";
import AddStamp from "../screens/Stamps/Screens/AddStamps";
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = observer(() => {
  // clearToken();

  const Mobx = useCounterStore();
  console.log("StackNaviMobx", Mobx.access_token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {Mobx.access_token ? (
        <Stack.Group>
          <Stack.Screen
            name="DashboardDrawernavigator"
            component={Drawernavigator}
          />
          <Stack.Screen name="ManageDrawer" component={ManageDrawer} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="TemplateHistory" component={TemplateHistory} />
          <Stack.Screen name="AddSignature" component={AddSignature} />
          <Stack.Screen name="AddStamp" component={AddStamp} />
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

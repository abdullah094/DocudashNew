import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigators/Drawernavigator";
import StackNavigator from "./src/navigators/StackNavigator";
import useCachedResources from "./src/hooks/useCachedResources";
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigators/Drawernavigator";
import StackNavigator from "./src/navigators/StackNavigator";
import useCachedResources from "./src/hooks/useCachedResources";
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";
import {
  Appbar,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
  PaperProvider,
  useTheme,
  MD2LightTheme,
  MD2DarkTheme,
} from "react-native-paper";
import { light, dark } from "./src/assets/styles/LightTheme";
import { MenuProvider } from "react-native-popup-menu";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./src/Redux/Store";
export default function App() {
  const [nightMode, setNightmode] = useState(false);
  const isLoadingComplete = useCachedResources();

  const theme = {
    ...DefaultTheme,
    colors: light.colors, // Copy it from the color codes scheme and then use it here
  };
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ReduxProvider store={Store}>
      <PaperProvider theme={theme}>
        <MenuProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </MenuProvider>
      </PaperProvider>
    </ReduxProvider>
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

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
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
  MD2LightTheme,
  MD2DarkTheme,
} from "react-native-paper";
import { darkColors, lightColors } from "./src/assets/styles/LightTheme";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { MenuProvider } from "react-native-popup-menu";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./src/Redux/Store";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const colorScheme = useColorScheme();
  // const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: darkColors.colors }
      : { ...MD3LightTheme, colors: lightColors.colors };

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ReduxProvider store={Store}>
      <BottomSheetModalProvider>
        <PaperProvider theme={paperTheme}>
          <MenuProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </MenuProvider>
        </PaperProvider>
      </BottomSheetModalProvider>
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

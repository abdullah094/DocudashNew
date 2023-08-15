import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import StackNavigator from '@navigation/StackNavigator';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { NavigationContainer } from '@react-navigation/native';
import store from '@stores/index';
import { darkColors, lightColors } from '@utils/index';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import useCachedResources from './src/hooks/useCachedResources';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: darkColors.colors }
      : { ...MD3LightTheme, colors: lightColors.colors };

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

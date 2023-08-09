import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { getTokenGlobal, clearToken } from '../AsyncGlobal';
import { useCounterStore } from '../../MobX/TodoStore';
import { observer } from 'mobx-react-lite';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const context = useCounterStore();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const token = await getTokenGlobal();

        if (!token) {
          context.deleteAccessToken();
        } else {
          context.addAccessToken(token);
        }

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          nunito: require('../assets/Fonts/Nunito-Regular.ttf'),
          'nunito-SemiBold': require('../assets/Fonts/Nunito-SemiBold.ttf'),
        });
      } catch (e) {
        clearToken();
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
function deleteAccessToken() {
  throw new Error('Function not implemented.');
}

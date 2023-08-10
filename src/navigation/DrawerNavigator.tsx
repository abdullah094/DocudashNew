import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '@screens/HomeScreen';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import COLORS from '@constants/colors';
import CustomDrawerContent from '@components/CustomDrawerContent';
import DrawerScreenContainer from '@components/DrawerScreenContainer';
import StackNavigator from './StackNavigator';
import ProfileScreen from '@screens/ProfileScreen';
import SignatureList from '@screens/Signatures/List';
import StampList from '@screens/Stamp/List';
import Profile from '@screens/Profile';
import { useRoute } from '@react-navigation/native';
import Inbox from '@screens/Manage/Inbox';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const route = useRoute();
  console.log('name', route.name);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 200,
          backgroundColor: COLORS.primary,
        },
        // @ts-ignore
        overlayColor: null,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.secondary,
        // @ts-ignore
        drawerItemStyle: { backgroundColor: null },
        sceneContainerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <Icon name="paw" size={25} style={{ marginRight: -20, color }} />
          ),
        }}
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      {route.name == 'Home' ? (
        <>
          <Drawer.Screen
            name="MANAGE"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="heart" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer>
                <Inbox {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="SIGNATURES"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="gift" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer>
                <SignatureList {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="STAMPS"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="plus-box" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer>
                <StampList {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="PROFILE"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="account" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer>
                <Profile {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>
        </>
      ) : (
        <></>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

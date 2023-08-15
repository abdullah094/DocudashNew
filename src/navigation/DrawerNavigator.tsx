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
import { useDispatch, useSelector } from 'react-redux';
import { selectRouteName } from '@stores/Slices';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const route = useRoute();
  const routeName = useSelector(selectRouteName);
  console.log('name', routeName);
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
      {routeName != 'Manage' ? (
        <>
          <Drawer.Screen
            name="HomeScreen"
            options={{
              title: 'Home',
              drawerIcon: ({ color }) => (
                <Icon name="home" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer {...props}>
                <HomeScreen {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>
          <Drawer.Screen
            initialParams={{ heading: 'Inbox' }}
            name="MANAGE"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="email-newsletter" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer {...props}>
                <Inbox {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="SIGNATURES"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="signature-freehand" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer {...props}>
                <SignatureList {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="STAMPS"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="stamper" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer {...props}>
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
        <>
          <Drawer.Screen
            initialParams={{ heading: 'Inbox' }}
            name="INBOX"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="inbox" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => {
              return (
                <DrawerScreenContainer>
                  <Inbox {...props} />
                </DrawerScreenContainer>
              );
            }}
          </Drawer.Screen>
          <Drawer.Screen
            name="SEND"
            initialParams={{ heading: 'Sent' }}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="email-send" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => {
              return (
                <DrawerScreenContainer>
                  <Inbox {...props} />
                </DrawerScreenContainer>
              );
            }}
          </Drawer.Screen>
          <Drawer.Screen
            name="DRAFT"
            initialParams={{ heading: 'Draft' }}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="archive-clock" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => {
              return (
                <DrawerScreenContainer>
                  <Inbox {...props} />
                </DrawerScreenContainer>
              );
            }}
          </Drawer.Screen>
          <Drawer.Screen
            name="TRASH"
            initialParams={{ heading: 'Trash' }}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="trash-can" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => {
              return (
                <DrawerScreenContainer>
                  <Inbox {...props} />
                </DrawerScreenContainer>
              );
            }}
          </Drawer.Screen>
          <Drawer.Screen
            name="HomeScreen"
            options={{
              title: 'Home',
              drawerIcon: ({ color }) => (
                <Icon name="home" size={25} style={{ marginRight: -20, color }} />
              ),
            }}
          >
            {(props) => (
              <DrawerScreenContainer {...props}>
                <HomeScreen {...props} />
              </DrawerScreenContainer>
            )}
          </Drawer.Screen>
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

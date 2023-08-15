import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../constants/colors';
import DrawerProfileModal from './DrawerProfileModal';
import tw from 'twrnc';
import { Drawer } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@stores/Slices';
import { clearToken } from '@utils/AsyncGlobal';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
      }}
    >
      <View style={tw`flex-row items-center  mt-5 w-full justify-between px-5`}>
        <Image style={tw`w-30 h-7 `} source={require('@assets/docudash_pow_logo.png')} />
      </View>
      <DrawerProfileModal />

      <DrawerItemList {...props} />
      <Drawer.Item
        active
        label="LOGOUT"
        style={tw`m-1 bg-transparent rounded-none`}
        icon="logout"
        onPress={() => {
          dispatch(logoutUser());
          clearToken();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({});

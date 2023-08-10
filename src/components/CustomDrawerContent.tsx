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

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
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
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({});

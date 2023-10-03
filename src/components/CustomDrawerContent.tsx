import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { logoutUser, selectRouteName } from '@stores/Slices';
import { clearToken } from '@utils/AsyncGlobal';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import DrawerProfileModal from './DrawerProfileModal';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();
  const routeName = useSelector(selectRouteName);
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
        paddingBottom: 100,
      }}
    >
      <View style={tw`flex-row items-center  mt-5 w-full justify-between px-5`}>
        <Image style={tw`w-30 h-7 `} source={require('@assets/docudash_pow_logo.png')} />
      </View>
      <DrawerProfileModal />
      {routeName === 'Manage' && (
        <Drawer.Item
          active
          label="Add New"
          style={tw`m-1 bg-green-500 `}
          icon="plus"
          onPress={() => {
            navigation.navigate('Edit');
          }}
        />
      )}
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

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { colors } from '../../Colors';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import DrawerProfileModal from './Components/DrawerProfileModal';
import { observer } from 'mobx-react';
import { useCounterStore } from '../../../MobX/TodoStore';
import { clearToken } from '../../AsyncGlobal';
import { Button, List } from 'react-native-paper';

const BellTrigger = () => (
  <Image
    style={[tw`h-5 w-5 `, { tintColor: colors.blue }]}
    source={require('../../assets/bell.png')}
  />
);

const CustomDrawer = () => {
  type Result = boolean extends true ? 1 : 0;

  const navigation = useNavigation();
  const Mobx = useCounterStore();
  return (
    <View style={tw`h-full my-4 bg-red-200`}>
      <View style={tw`flex-1 bg-[${colors.white}]`}>
        <View style={tw`flex-row items-center  mt-5 w-full justify-between px-5`}>
          <Image style={tw`w-30 h-7 `} source={require('../../assets/docudash_pow_logo.png')} />
          <Menu>
            <MenuTrigger text={<BellTrigger />} />
            <MenuOptions>
              <MenuOption
                style={styles.menu_block}
                onSelect={() => navigation.navigate('Browser', 'https://docudash.net/pricing')}
                text="Get Started"
              />
              <MenuOption
                style={styles.menu_block}
                onSelect={() => navigation.navigate('Browser', 'https://docudash.net/contact-us')}
                text="Support"
              />
              <MenuOption
                style={styles.menu_block}
                onSelect={() => alert(`Save`)}
                text="Community"
              />
              <MenuOption
                style={styles.menu_block}
                onSelect={() => alert(`Save`)}
                text="Trust center"
              />
              <MenuOption
                style={styles.menu_block}
                onSelect={() => navigation.navigate('Browser', 'https://docudash.net/contact-us')}
                text="Contact Us"
              />
            </MenuOptions>
          </Menu>
        </View>
        <DrawerProfileModal />

        <ScrollView contentContainerStyle={tw`w-[280px]`}>
          <View style={{}}>
            <List.Item
              title="Dashboard"
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />

            <List.Item
              title="Manage"
              onPress={() => {
                navigation.navigate('ManageDrawer');
              }}
            />
            <List.Item
              title="Template"
              onPress={() => {
                navigation.navigate('Template');
              }}
            />
            <List.Item
              title="Signatures"
              onPress={() => {
                navigation.navigate('Signatures');
              }}
            />
            <List.Item
              title="Stamps"
              onPress={() => {
                navigation.navigate('Stamps');
              }}
            />
            <List.Item
              title="Signout"
              onPress={() => {
                Alert.alert('Signout Successfull');
                Mobx.deleteAccessToken();
                clearToken();
              }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={tw`absolute bottom-5 left-0 right-0 bg-white`}>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Browser', 'https://docudash.net/pricing');
          }}
          style={[tw`items-center w-40 rounded-lg  self-center`]}
        >
          View Plans
        </Button>
        <Text style={tw`text-black text-3 text-center mt-3 font-semibold`}>© 2023 DocuDash</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  box: tw`border-2 border-white p-2 px-4 mt-3 rounded-lg`,
  box_num: tw`text-10 text-white`,
  box_text: tw`text-white`,
  button: tw` py-3 justify-center  px-5 w-full`,
  button_text: tw`text-black text-4`,
  menu_block: tw`p-5`,
});

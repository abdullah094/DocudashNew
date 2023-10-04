import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import DropDown from 'react-native-paper-dropdown';
import { Button, Divider, Menu, Text } from 'react-native-paper';
import GreenButton from '@components/GreenButton';
import { useNavigation } from '@react-navigation/native';
import { SignUpStackScreenProps } from '@type/*';
import Icon from '@expo/vector-icons/AntDesign';

const NotaryOrUser = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownVal, setDropDownVal] = useState('User');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<SignUpStackScreenProps<'NotaryOrUser'>['navigation']>();

  const closeMenu = () => {
    setShowDropDown(false);
  };
  const openMenu = () => {
    setShowDropDown(true);
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <View style={tw`w-50 gap-4 `}>
        <Image style={tw`w-40 h-30 self-center`} source={require('@assets/adaptive-icon.png')} />
        <Text variant="titleMedium" style={tw`font-bold text-center`}>
          How do you want to proceed?
        </Text>
        <Menu
          style={tw`w-50`}
          visible={showDropDown}
          anchorPosition="bottom"
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity
              style={tw`flex-row items-center w-full bg-white justify-between  px-4 border rounded-xl h-12 border-gray-500`}
              onPress={openMenu}
            >
              <Text variant="labelLarge" style={tw``}>
                {dropDownVal}
              </Text>
              <View style={tw`bottom-0`}>
                <Icon name="down" size={15} color={'black'} />
              </View>
            </TouchableOpacity>
          }
        >
          <Menu.Item
            title="User"
            style={tw`w-full self-center`}
            onPress={() => {
              setDropDownVal('User');
              closeMenu();
            }}
          />
          <Divider />
          <Menu.Item
            style={tw`w-full`}
            title="Notary"
            onPress={() => {
              setDropDownVal('Notary');
              closeMenu();
            }}
          />
        </Menu>
        <GreenButton
          loading={loading}
          text={'Proceed'}
          onPress={() => {
            if (dropDownVal === 'User') {
              navigation.navigate('SignUpIndex');
            } else if (dropDownVal === 'Notary') {
              navigation.navigate('NotaryLoginStackNavigator');
            }
          }}
        />
      </View>
    </View>
  );
};

export default NotaryOrUser;

const styles = StyleSheet.create({});

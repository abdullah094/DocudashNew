import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, List } from 'react-native-paper';
import tw from 'twrnc';
import { useCounterStore } from '../../../MobX/TodoStore';
import { ManageDrawerScreenProps } from '../../../types';
import { colors } from '../../Colors';
import DrawerProfileModal from '../DashBoard/Components/DrawerProfileModal';

const CustomDrawerManage = () => {
  const navigation = useNavigation<ManageDrawerScreenProps<'Inbox'>['navigation']>();
  const Mobx = useCounterStore();

  return (
    <View style={tw`h-full my-4 bg-red-200`}>
      <View style={tw`flex-1 bg-[${colors.white}]`}>
        <View style={tw`flex-row items-center  mt-5 w-full justify-between px-5`}>
          <Image style={tw`w-30 h-7 `} source={require('../../assets/docudash_pow_logo.png')} />
        </View>
        <DrawerProfileModal />

        <ScrollView contentContainerStyle={tw`w-[280px]`}>
          <View style={{}}>
            <List.Item
              left={(props) => <List.Icon {...props} icon="home" />}
              title="Home"
              onPress={() => {
                navigation.navigate('DashboardDrawerNavigator', {
                  // @ts-ignore
                  screen: 'Dashboard',
                  params: {},
                });
              }}
            />
            <List.Item
              style={tw`rounded-lg bg-[#6FAC46]`}
              left={(props) => <List.Icon {...props} color="white" icon="book-plus" />}
              title="Add New"
              onPress={() => {
                navigation.navigate('Edit');
              }}
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="inbox-outline" />}
              title="Inbox"
              onPress={() => {
                navigation.navigate('Inbox', { heading: 'Inbox' });
              }}
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="send" />}
              title="Sent"
              onPress={() => {
                navigation.navigate('Inbox', { heading: 'Sent' });
              }}
            />

            <List.Item
              left={(props) => <List.Icon {...props} icon="email-newsletter" />}
              title="Draft"
              onPress={() => {
                navigation.navigate('Inbox', { heading: 'Draft' });
              }}
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="delete-variant" />}
              title="Trash"
              onPress={() => {
                navigation.navigate('Inbox', { heading: 'Trash' });
              }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={tw`absolute bottom-5 left-0 right-0 bg-white`}>
        <Button mode="contained" style={[tw`items-center w-40 rounded-lg  self-center`]}>
          View Plans
        </Button>
        <Text style={tw`text-black text-3 text-center mt-3 font-semibold`}>© 2023 DocuDash</Text>
      </View>
    </View>
  );
};
const iconSize = 25;
const iconColor = 'gray';
export default CustomDrawerManage;

const styles = StyleSheet.create({
  button: tw`flex-row  flex-1 px-10 py-2 items-center  `,
  button_text: tw`ml-2 text-gray-600`,
});

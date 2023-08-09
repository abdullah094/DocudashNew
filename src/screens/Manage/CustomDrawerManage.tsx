import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ion from '@expo/vector-icons/Ionicons';
import { colors } from '../../Colors';
import { SignedInpStackScreenProps } from '../../../types';
import { Menu, MenuTrigger } from 'react-native-popup-menu';
import DrawerProfileModal from '../DashBoard/Components/DrawerProfileModal';
import { Button, IconButton, List } from 'react-native-paper';
import { useCounterStore } from '../../../MobX/TodoStore';
import { Ionicons } from '@expo/vector-icons';

interface tabProps {
  text: string;
  iconName: string;
  route: Screen;
  heading: string;
}
const TabButton = ({ text, iconName, route, heading }: tabProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(route, { heading: heading })}
    >
      <Text style={styles.button_text}>{text}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerManage = () => {
  const navigation = useNavigation();
  const Mobx = useCounterStore();

  return (
    <View style={tw`h-full my-4 bg-red-200`}>
      <View style={tw`flex-1 bg-[${colors.white}]`}>
        <View style={tw`flex-row items-center  mt-5 w-full justify-between px-5`}>
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
          <Image style={tw`w-30 h-7 `} source={require('../../assets/docudash_pow_logo.png')} />
        </View>
        <DrawerProfileModal />

        <ScrollView contentContainerStyle={tw`w-[280px]`}>
          <View style={{}}>
            <List.Item
              left={(props) => <List.Icon {...props} icon="home" />}
              title="Home"
              onPress={() => {
                navigation.navigate('Home');
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
            {/* <List.Item
              left={(props) => <List.Icon {...props} icon="inbox-outline" />}
              title="Starred"
              onPress={() => {
                navigation.navigate("Inbox", { heading: "Starred" });
              }}
              
            /> */}
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

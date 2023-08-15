import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import COLORS from '@constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeDrawerScreenProps } from '@type/*';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Divider, Menu } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectProfileData } from '@stores/Slices';

export default function HomeHeader({ heading }) {
  const navigation = useNavigation<HomeDrawerScreenProps<'HomeScreen'>['navigation']>();
  const route = useRoute<HomeDrawerScreenProps<'HomeScreen'>['route']>();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const user = useSelector(selectProfileData);
  return (
    <View style={style.header}>
      <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
      <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>{heading}</Text>
      <Menu
        anchorPosition="bottom"
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Avatar.Image
              source={{
                uri: user
                  ? user.profile_photo
                  : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
              size={30}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('Browser', {
              url: 'https://docudash.net/pricing',
              heading: 'PRICING',
            });
          }}
          title="Get Started"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('Browser', {
              url: 'https://docudash.net/contact-us',
              heading: 'SUPPORT',
            });
          }}
          title="Support"
        />
        <Divider />
        <Menu.Item onPress={() => {}} title="Community" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Trust center" />
        <Divider />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('Browser', {
              url: 'https://docudash.net/contact-us',
              heading: 'CONTACT US',
            });
          }}
          title="Contact Us"
        />
      </Menu>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

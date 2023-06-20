import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { colors } from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import DrawerProfileModal from "./Components/DrawerProfileModal";

const BellTrigger = () => (
  <Image
    style={[tw`h-5 w-5 `, { tintColor: colors.blue }]}
    source={require("../../assets/bell.png")}
  />
);

const CustomDrawer = () => {
  type Result = boolean extends true ? 1 : 0;

  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={tw`flex-1`}>
      <View style={tw`flex-1 bg-[${colors.white}] pb-50 gap-2 items-center`}>
        <View style={tw`flex-row items-center  w-full justify-between px-5`}>
          <Image
            style={tw`w-30 h-7 mt-5`}
            source={require("../../assets/docudash_pow_logo.png")}
          />

          <Menu>
            <MenuTrigger text={<BellTrigger />} />
            <MenuOptions>
              <MenuOption
                style={styles.menu_block}
                onSelect={() => alert(`Save`)}
                text="Get Started"
              />
              <MenuOption
                style={styles.menu_block}
                onSelect={() => alert(`Save`)}
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
                onSelect={() => alert(`Save`)}
                text="Contact Us"
              />
            </MenuOptions>
          </Menu>
        </View>
        <DrawerProfileModal />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.button_text}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.button_text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ManageDrawer")}
        >
          <Text style={styles.button_text}>Manage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Template")}
        >
          <Text style={styles.button_text}>Templates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}>Signout</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          tw`self-end bg-[${colors.green}] items-center w-40 my-10 self-center rounded-lg`,
        ]}
      >
        <Text style={[styles.button_text, tw`text-white font-bold`]}>
          View Plans
        </Text>
      </TouchableOpacity>
    </ScrollView>
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

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ion from "@expo/vector-icons/Ionicons";
import { colors } from "../../Colors";

interface tabProps {
  text: string;
  iconName: string;
  route: string;
}
const TabButton = ({ text, iconName, route }: tabProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(route)}
    >
      <Ion name={iconName} size={iconSize} color={iconColor} />

      <Text style={styles.button_text}>{text}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerManage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={tw`flex-1 items-center`}>
        <Image
          style={tw`w-50 h-10 mt-5`}
          source={require("../../assets/docudash_pow_logo.png")}
        />
        {/* Buttons view */}
        <View style={tw`w-full gap-3 mt-7`}>
          <TabButton text="Inbox" iconName={"mail-outline"} route={"Inbox"} />

          <TabButton text="Sent" iconName={"send-outline"} route={"Sent"} />

          <TabButton
            text="Draft"
            iconName={"newspaper-outline"}
            route={"Draft"}
          />

          <TabButton
            text="Starred"
            iconName={"star-outline"}
            route={"Starred"}
          />

          <TabButton
            text="Deleted Messages"
            iconName={"trash-bin-outline"}
            route={"DeleteMessages"}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const iconSize = 25;
const iconColor = "gray";
export default CustomDrawerManage;

const styles = StyleSheet.create({
  button: tw`flex-row  flex-1 px-10 py-2 items-center  `,
  button_text: tw`ml-2 text-gray-600`,
});

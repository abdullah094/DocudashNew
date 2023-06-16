import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { colors } from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import { log } from "react-native-reanimated";

interface box {
  text: string;
  num: number | null;
}
const Box = ({ text, num }: box) => {
  return (
    <View style={styles.box}>
      <Text style={styles.box_num}>{num}</Text>
      <Text style={styles.box_text}>{text}</Text>
    </View>
  );
};

const CustomDrawer = () => {
  type Result = boolean extends true ? 1 : 0;

  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={tw`flex-1`}>
      <View style={tw`flex-1 bg-[${colors.white}] pb-50 gap-2 items-center`}>
        <Image
          style={tw`w-50 h-10 mt-5`}
          source={require("../../assets/docudash_pow_logo.png")}
        />
        <View style={tw`w-full items-center py-5`}>
          <Image
            style={tw`w-20 h-20 rounded-full mt-5`}
            source={require("../../assets/ProfielPic.png")}
          />
          <Text style={tw`text-black text-5 mt-2`}>Waqar Khan</Text>
        </View>
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
});

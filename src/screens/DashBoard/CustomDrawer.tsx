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
  return (
    <ScrollView>
      <View style={tw`flex-1 bg-[${colors.green}] px-5 pb-50`}>
        <View style={tw`w-full items-center py-10`}>
          <Image
            style={tw`w-20 h-20 rounded-full`}
            source={require("../../assets/ProfielPic.png")}
          />
          <Text style={tw`text-white text-5 mt-2`}>Waqar Khan</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}>Manage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}>Templates</Text>
        </TouchableOpacity>
        <Box text={"Action Required"} num={0} />
        <Box text={"Wait for Others"} num={0} />
        <Box text={"Expiring soon"} num={0} />
        <Box text={"Completed"} num={0} />
      </View>
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  box: tw`border-2 border-white p-2 px-4 mt-3 rounded-lg`,
  box_num: tw`text-10 text-white`,
  box_text: tw`text-white`,
  button: tw` py-3 justify-center mt-2 `,
  button_text: tw`text-white text-4`,
});

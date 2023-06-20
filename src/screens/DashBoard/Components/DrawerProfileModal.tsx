import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../../../Colors";

const DrawerProfileModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Pressable
        style={tw`w-full items-center py-5`}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={tw`w-20 h-20 rounded-full mt-5`}
          source={require("../../../assets/ProfielPic.png")}
        />
        <Text style={tw`text-black text-5 mt-2`}>Syed Shahzaib</Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[
            tw`flex-1 justify-center items-center`,
            { backgroundColor: "rgba(0,0,0,0.8)" },
          ]}
        >
          <View
            style={tw`py-20 w-75 bg-white justify-center items-center gap-4`}
          >
            <Pressable
              style={tw`absolute top-1 right-2 p-2`}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close-circle" size={30} />
            </Pressable>
            {/* content */}
            <View style={tw`gap-2 w-[80%] overflow-hidden`}>
              <Text style={tw`font-bold text-4`}>Syed Shahzaib</Text>
              <Text style={styles.profile_small_text}>
                shahzaibjaffri512@gmail.com
              </Text>
              <Text style={styles.profile_small_text}>Account #78268922</Text>
              <Text style={styles.profile_small_text}>Syed Shahzaib</Text>
              <TouchableOpacity
                style={tw`bg-[${colors.green}] justify-center items-center h-8 rounded-lg`}
              >
                <Text style={tw`text-white`}>Manage Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DrawerProfileModal;

const styles = StyleSheet.create({
  profile_small_text: tw`text-[${colors.gray}]`,
});

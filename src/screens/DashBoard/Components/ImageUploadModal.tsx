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
import { BlurView } from "react-native-blur";

const ImageUploadModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          style={tw`w-20 h-20 rounded-full mt-5 top--1 `}
          source={require("../../../assets/ProfielPic.png")}
        />
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
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
            style={tw`h-120 w-75 bg-white justify-center items-center gap-4`}
          >
            <Pressable
              style={tw`absolute top-1 right-2 p-2`}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close-circle" size={30} />
            </Pressable>
            <View
              style={tw`w-[90%] h-[70%] top-3  gap-2 border-2 border-[${colors.blue}] border-dashed rounded-lg justify-center items-center`}
            >
              <Image
                style={tw`h-10 w-15 rounded-md`}
                source={require("../../../assets/ImageUploadIcon.png")}
              />
              <Text style={tw`text-[${colors.blue}]  font-nunito`}>
                Your photo here or upload
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-[${colors.green}] w-[90%] top-3 h-10 rounded-lg justify-center items-center`}
            >
              <Text style={tw`text-white font-bold text-4`}>UPLOAD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImageUploadModal;

const styles = StyleSheet.create({});

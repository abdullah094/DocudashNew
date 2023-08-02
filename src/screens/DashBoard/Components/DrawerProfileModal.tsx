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
import { useCounterStore } from "../../../../MobX/TodoStore";
import { User } from "../../../../types";

const DrawerProfileModal = () => {
  const Mobx = useCounterStore();
  const user: User = Mobx.user;
  console.log(user);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {user && (
        <Pressable
          style={tw`w-full items-center py-5`}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={tw`w-20 h-20 rounded-full mt-5`}
            resizeMode="cover"
            source={{ uri: user.profile_photo }}
            // source={require("../../../assets/ProfielPic.png")}
          />
          <Text style={tw`text-black text-5 mt-2`}>
            {user.first_name} {user.last_name}
          </Text>
        </Pressable>
      )}

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
              <Text style={tw`font-bold text-4`}>
                {user.first_name} {user.last_name}
              </Text>
              <Text style={styles.profile_small_text}>{user.email}</Text>
              <Text style={styles.profile_small_text}>
                {" "}
                Account #00000{user.id}
              </Text>
              <Text style={styles.profile_small_text}>
                {user.first_name} {user.last_name}
              </Text>
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

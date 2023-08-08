import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { colors } from "../../Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { HeaderOption } from "../../../types";

interface IRectangle {
  heading: string;
  description: string;
  check: number;
  onPress: () => void;
  id: string;
}
const Rectangle = ({
  id,
  heading,
  description,
  check,
  onPress,
}: IRectangle) => {
  return (
    <TouchableOpacity
      id={id}
      onPress={onPress}
      style={tw`flex-row items-center  py-3 mt-5  pl-3 pr-10 shadow-md bg-white rounded-lg`}
    >
      <View
        style={tw`bg-[${"#D9D9D9"}] w-8 h-8 rounded-full items-center justify-center shadow-lg`}
      >
        {check ? (
          <AntDesign name="checkcircle" size={30} color={colors.green} />
        ) : null}
      </View>
      <View style={tw`ml-3 gap-1`}>
        <Text style={tw`font-bold text-[${colors.black}]`}>{heading}</Text>
        <Text style={tw`text-[${colors.gray}]`}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface IProgressModal {
  progress: number;
  obj: HeaderOption | undefined;
  steps: number | null;
}
const { width } = Dimensions.get("window");
const ProgressModal = ({ progress, obj, steps }: IProgressModal) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  const navigation = useNavigation();
  if (!obj) return <></>;

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={tw`bg-[${colors.blue}] p-3 px-5 mt-5 rounded-md`}
      >
        <Text style={tw`text-[${colors.white}] font-nunito`}>Show Me</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw` items-center justify-center h-full
           `}
        >
          <View style={tw`bg-gray-100 w-full flex-1 py-10 px-5`}>
            <View style={tw`flex-row items-center justify-end`}>
              <IconButton
                icon={"close-circle"}
                onPress={() => setModalVisible(false)}
              ></IconButton>
            </View>
            <View>
              <View style={tw`flex-row items-center py-5 justify-between`}>
                <View style={tw`overflow-hidden  w-2/3`}>
                  <Text style={tw`font-bold text-5`}>
                    Get Started with docudash
                  </Text>
                  <Text style={tw`mt-1`}>
                    This guide will help you to get most of DocuSign in 6 easy
                    steps
                  </Text>
                </View>
                <Text
                  style={tw`font-bold text-5 self-start `}
                >{`${steps}/6`}</Text>
              </View>
              <Progress.Bar
                progress={progress}
                color={"#6FAC46"}
                unfilledColor={"#D9D9D9"}
                width={null}
                borderColor={"#D9D9D9"}
                height={15}
                borderRadius={20}
              />
            </View>
            <Rectangle
              id={"1"}
              heading={"Sign up now"}
              description={"All set. Now let's get started!"}
              check={obj?.sign_up}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
            <Rectangle
              id={"2"}
              heading={"Send Documents for Signature"}
              description={"Easily track your envelope with us"}
              check={obj?.Send_Documents_for_Signature}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("Edit");
              }}
            />
            <Rectangle
              id={"3"}
              heading={"Upload your photos"}
              description={"Personalize your envelopes with a photo."}
              check={obj?.Upload_Your_Photo}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("Profile");
              }}
            />
            <Rectangle
              id={"4"}
              heading={"Adopt Your Signature"}
              description={"Create your personal signature."}
              check={obj?.adopt_your_signature}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("Signatures");
              }}
            />
            <Rectangle
              id={"5"}
              heading={"Create a Template"}
              description={
                "Resending the same documents? Save time with templates."
              }
              check={obj?.template}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("Template");
              }}
            />
            <Rectangle
              id={"6"}
              heading={"Brand Your Account"}
              description={
                "Add your professional touch with your logo and colors."
              }
              check={obj?.brand}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default ProgressModal;

const styles = StyleSheet.create({});

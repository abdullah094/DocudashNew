import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../../../Colors";
import { BlurView } from "react-native-blur";
import { SvgUri } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useCounterStore } from "../../../../MobX/TodoStore";
import { BarIndicator } from "react-native-indicators";

interface IImageUploadModal {
  image: string | undefined;
  _imageRef: (imageRef: boolean) => void;
}

const ImageUploadModal = ({ image, _imageRef }: IImageUploadModal) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [_image, setImage] = useState("");
  const [uploadText, setUploadText] = useState("Upload");
  const [disableUploadButton, setDisableUploadButton] = useState(true);
  const [imageRef, setImageRef] = useState(false);
  const Mobx = useCounterStore();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDisableUploadButton(false);
    }
  };
  const upload = () => {
    setUploadText(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    setDisableUploadButton(true);
    let body = new FormData();
    body.append("photo", {
      uri: _image,
      name: "photo.png",
      filename: "imageName.png",
      type: "image/png",
    });
    axios
      .post("https://docudash.net/api/upload-image", body, {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
        },
      })
      .then((response) => {
        setUploadText("Upload");
        setDisableUploadButton(false);
        const data = response.data;
        if (data.success) {
          Alert.alert(data.message);
          setModalVisible(false), setImage("");
          setImageRef(!imageRef);
          _imageRef(imageRef);
        } else {
          Alert.alert(data.message.photo[0]);
        }
      })
      .catch((error) => {
        setUploadText("Upload");
        setDisableUploadButton(false);
        console.log(error);
      });
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true), setImage("");
        }}
      >
        <View style={tw`w-20 h-20 rounded-full mt-5 top--1 overflow-hidden `}>
          {image?.includes(".png") || image?.includes(".jpg") ? (
            <Image style={tw`w-[100%] h-[100%]`} source={{ uri: image }} />
          ) : (
            <SvgUri width="100%" height="100%" uri={image} />
          )}
        </View>
      </Pressable>
      <Modal
        animationType="slide"
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
            style={tw`w-75 bg-white justify-center items-center gap-4 py-8 rounded-md`}
          >
            <Pressable
              style={tw`absolute top-1 right-2 p-2`}
              onPress={() => {
                setModalVisible(false), setImage("");
              }}
            >
              <MaterialCommunityIcons name="close-circle" size={30} />
            </Pressable>
            <View
              style={tw`w-[90%] py-12 top-3 mt-9 gap-2 border-2 border-[${colors.blue}] border-dashed rounded-lg justify-center items-center`}
            >
              {_image ? (
                <Image
                  style={tw`h-40 w-55 rounded-sm`}
                  source={{ uri: _image }}
                />
              ) : (
                <>
                  <Image
                    style={tw`h-10 w-15 rounded-md`}
                    source={require("../../../assets/ImageUploadIcon.png")}
                  />
                  <Text style={tw`text-[${colors.blue}]  font-nunito`}>
                    Your photo here or upload
                  </Text>
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={pickImage}
              style={tw`bg-[${colors.green}] w-[90%] top-3 h-10 rounded-lg justify-center items-center`}
            >
              <Text style={tw`text-white font-bold text-4`}>Select</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disableUploadButton}
              onPress={upload}
              style={tw`bg-[${colors.green}] w-[90%] top-3 h-10 rounded-lg justify-center items-center`}
            >
              <Text style={tw`text-white font-bold text-4`}>{uploadText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImageUploadModal;

const styles = StyleSheet.create({});

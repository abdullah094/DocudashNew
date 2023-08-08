import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getTokenGlobal } from "../../AsyncGlobal";
import * as Progress from "react-native-progress";
import tw from "twrnc";
import { colors } from "../../Colors";
import ProgressModal from "../DashBoard/ProgressModal";
import ImageUploadModal from "../DashBoard/Components/ImageUploadModal";
import axios from "axios";
import { useCounterStore } from "../../../MobX/TodoStore";
import { Popup } from "../../components/Popup";
import {
  DashboardAPI,
  HeaderAPI,
  HeaderOption,
  IUserData,
  User,
} from "../../../types";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Avatar,
  Chip,
  Divider,
  Button,
  List,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Loader from "../MainLoader/Loader";

interface box {
  text: string;
  num: number | null;
}

const Box = ({ text, num }: box) => {
  return (
    <View style={styles.box}>
      <Text style={styles.box_num}>{num}</Text>
      <Text style={styles.box_text} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};
const Dashboard = () => {
  const bottomSheetRef = React.useRef();
  const snapPoints = React.useMemo(() => ["35%", "45%"], []);
  const handleSheetChanges = React.useCallback((index: number) => {}, []);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const [userData, setUserData] = useState<User>();
  const [signature, setSignature] = useState<any>();
  const [documents, setDocuments] = useState<DocumentPicker.DocumentResult[]>(
    new Array()
  );
  const [imagesUpload, setImagesUpload] = useState<
    {
      uri: string;
      name: string;
      type: "image" | "video" | undefined;
    }[]
  >(new Array());
  const [progressBar, setProgressBar] = useState<number>(0);
  const [completeNumber, setCompleteNumber] = useState<number>(0);
  const [Headers, setHeaders] = useState<HeaderOption>();
  const [imageRef, setImageRef] = useState<boolean>();
  const [alert, setAlert] = useState(false);
  const navigation = useNavigation();
  const Mobx = useCounterStore();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [dashNumber, setDashNumber] = useState({
    actionRequired: 0,
    waitingForOthers: 0,
    expiringSoon: 0,
    completed: 0,
  });

  const fetchDashData = () => {
    axios
      .get("https://docudash.net/api/dashboard", {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
        },
      })
      .then((response) => {
        const data: DashboardAPI = response.data;
        console.log("DashboardAPI", data);
        setDashNumber({
          ...dashNumber,
          waitingForOthers: data.WaitingForOthers,
          completed: data.CompletedEmails,
        });
        Mobx.AddUser(data.user);
        setUserData(data.user);
        setDataLoading(false);
        if (data.signature?.signature) {
          setSignature(data.signature);
        } else {
          setSignature("");
        }
      });
  };

  useEffect(() => {
    fetchDashData();
  }, [navigation]);

  const fetchData = () => {
    console.log("Fetch data");

    axios
      .get("https://docudash.net/api/getStartedWithDocudash", {
        headers: { Authorization: `Bearer ${Mobx.access_token}` },
      })
      .then((response) => {
        const { data, message, status } = response.data as HeaderAPI;

        let ones = 0;
        let zeros = 0;

        const obj = response.data.data;
        setProgressBar(obj.percentage / 100);
        delete obj.percentage;
        setHeaders(obj);

        const key_array = Object.values(obj);
        key_array.forEach((element) => {
          if (element) {
            ones++;
          } else {
            zeros++;
          }
        });
        setCompleteNumber(ones);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const imageRefFunc = (imageRef: boolean) => {
    setImageRef(imageRef);
  };
  useEffect(() => {
    fetchData();
  }, [imageRef]);

  const uploadFile = async (selected: string) => {
    bottomSheetRef.current.close();
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"], // You can specify the file types here (e.g., 'image/*', 'application/pdf', etc.)
      });
      if (result.type !== "cancel") setDocuments((prev) => [...prev, result]);
    } catch (err) {
      console.log("err", err);
    }
  };
  console.log("docs", imagesUpload);

  const uploadImage = async () => {
    bottomSheetRef.current.close();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("reault", result);

    if (!result.canceled) {
      const image = result.assets[0];
      const imageToUpload = {
        uri: image.uri,
        name: image.fileName || image.uri,
        type: image.type,
      };
      setImagesUpload((prev) => [...prev, imageToUpload]);
    }
  };

  const pickImage = async () => {
    if (loading) return;

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setLoading(true);
    if (!result.canceled) {
      const image = result.assets[0];
      let formData = new FormData();
      const imageToUpload = {
        uri: image.uri,
        name: image.fileName || image.uri,
        type: image.type,
      };

      formData.append("photo", imageToUpload);
      let headers = {
        Authorization: `Bearer ${Mobx.access_token}`,
        "Content-Type": "multipart/form-data",
      };
      axios
        .post("https://docudash.net/api/upload-image", formData, { headers })
        .then((response) => {
          setLoading(false);
          const {
            success,
            message,
          }: {
            success: false;
            message: {
              photo: string[];
            };
          } = response.data;
          if (success) {
            // @ts-ignore
            Alert.alert(message);
            fetchDashData();
          } else {
            if (message.photo) {
              message.photo.map((x) => Alert.alert(x));
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
      // setImage(result.assets[0].uri);
    }
  };

  if (dataLoading) return <Loader />;

  return (
    <>
      <ScrollView contentContainerStyle={tw`pb-20`}>
        <View style={tw` py-10 items-center px-5 justify-center`}>
          <View>
            <View
              style={tw`flex-row items-center justify-between w-80 overflow-hidden py-2`}
            >
              <Text style={tw`text-[${colors.black}] font-bold`}>
                Get Started with Docudash
              </Text>
              <Text style={tw`text-[${colors.black}] font-bold`}>
                {` ${completeNumber}/6 Completed`}
              </Text>
            </View>
            <Progress.Bar
              progress={progressBar}
              color={"#6FAC46"}
              unfilledColor={"#D9D9D9"}
              width={null}
              borderColor={"#D9D9D9"}
            />
          </View>
          <ProgressModal
            progress={progressBar}
            obj={Headers}
            steps={completeNumber}
          />
        </View>
        {/* 2nd */}
        <View style={tw`items-center bg-[${colors.green}] py-10 gap-2`}>
          <View style={tw`flex-row items-center h-25`}>
            {loading ? (
              <ActivityIndicator size={100} animating={true} />
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <Avatar.Image
                  size={100}
                  style={tw`m-2`}
                  source={{ uri: userData?.profile_photo }}
                />
              </TouchableOpacity>
            )}

            <Image
              style={tw`w-2.1 h-24 rounded-full mt-5 top--2 mx-2`}
              source={require("../../assets/WhiteLine.png")}
            />
            <View style={tw`h-full justify-between  px-1  items-start `}>
              <Text style={[styles.white_text, tw`font-semibold`]}>
                Signed by:
              </Text>

              {signature ? (
                <>
                  <Image
                    style={[tw`h-12 w-full `, { tintColor: "white" }]}
                    source={{
                      uri: signature?.signature.replace(/(\r\n|\n|\r)/gm, ""),
                    }}
                    resizeMode="contain"
                  />

                  <Text style={styles.white_text}>
                    {signature.signature_code}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.white_text}>Needs to sign</Text>
                  <Text style={styles.white_text}>
                    Sign id will generate after signature
                  </Text>
                </>
              )}
            </View>
          </View>
          <View style={tw`flex-row items-center mt-6`}>
            <Box text={"Action Required"} num={0} />
            <Box
              text={"Waiting for Others"}
              num={dashNumber.waitingForOthers}
            />
          </View>
          <View style={tw`flex-row items-center`}>
            <Box text={"Expiring Soon"} num={0} />
            <Box text={"Completed"} num={dashNumber.completed} />
          </View>
        </View>

        <View style={tw`bg-white px-8 py-8 gap-4`}>
          <Pressable
            onPress={handlePresentModalPress}
            style={tw`border-2 py-10  rounded-xl border-dashed border-[${colors.blue}] justify-center items-center`}
          >
            <View style={tw`p-1`}>
              <Image
                style={tw`h-10 w-10 self-center`}
                source={require("../../assets/Upload.png")}
              />
              <Text style={tw`text-[${colors.blue}] mt-2`}>
                Drop documents here to get started
              </Text>
            </View>
          </Pressable>

          <View style={tw`py-5 my-2`}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[...documents, ...imagesUpload]}
              renderItem={({ item, index }) => (
                <>
                  <View
                    style={tw`items-center mx-2 border-2 rounded-lg p-2 py-5 gap-2`}
                  >
                    <Pressable
                      onPress={() => {
                        setDocuments(
                          documents.filter((x, i) => {
                            return index != i;
                          })
                        );
                      }}
                      style={tw` top--5 right--11`}
                    >
                      <MaterialCommunityIcons
                        name="close-circle"
                        color={"red"}
                        size={25}
                      />
                    </Pressable>
                    <MaterialCommunityIcons
                      name={
                        item.mimeType === "application/pdf"
                          ? "file-pdf-box"
                          : item.mimeType === "image/png"
                          ? "file-image"
                          : "file-question-outline"
                      }
                      size={40}
                    />
                    <Text style={tw`w-25 text-center text-3`} numberOfLines={2}>
                      {item.name ? item.name : "Untitled file"}
                    </Text>
                  </View>
                </>
              )}
            />
          </View>
          {documents.length > 0 ? (
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate("Edit", {
                  files: documents,
                  images: imagesUpload,
                })
              }
            >
              Start Now
            </Button>
          ) : imagesUpload.length > 0 ? (
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate("Edit", {
                  files: documents,
                  images: imagesUpload,
                })
              }
            >
              Start Now
            </Button>
          ) : null}
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <View style={tw`flex-1 bg-white`}>
          <List.Item
            onPress={uploadFile}
            title="Upload Document"
            description="Sign document files like pdf"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
          <Divider />
          <List.Item
            onPress={uploadImage}
            title="Upload Image"
            description="Sign images like png/jpg"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
          <Divider />
          <List.Item
            onPress={() => bottomSheetRef.current.close()}
            title="Cancel"
            left={(props) => <List.Icon {...props} icon="close" />}
          />
        </View>
      </BottomSheetModal>

      <Popup
        heading={"Alert"}
        description={"Upload a document"}
        alert={alert}
        setAlert={setAlert}
      />
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  white_text: tw`text-white text-4 w-50]`,
  box: tw`border-2 border-white p-2 mt-1 rounded-lg w-[40%] mx-2 h-22`,
  box_num: tw`text-10 text-white`,
  box_text: tw`text-white text-4`,
  doc_type_modal_button: tw` bg-[${colors.blue}] w-50 h-15 rounded-xl justify-center items-center `,
  doc_type_modal_button_text: tw`text-white z-auto font-bold text-5 `,
});

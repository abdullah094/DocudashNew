import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
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
import { IUserData } from "../../../types";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "react-native-ui-lib";

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
  const [userData, setUserData] = useState<IUserData>();
  const [signature, setSignature] = useState<any>();
  const [documents, setdocuments] = useState([]);
  const [progressBar, setProgressBar] = useState<number>(0);
  const [completeNumber, setCompleteNumber] = useState<number>(0);
  const [setshowMeObj, setSetshowMeObj] = useState<object | null | undefined>();
  const [imageRef, setImageRef] = useState<boolean>();
  const [alert, setAlert] = useState(false);
  const Mobx = useCounterStore();
  console.log(Mobx.access_token);

  const fetchDashData = () => {
    axios
      .get("https://docudash.net/api/dashboard", {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        // console.log(data.user);

        setUserData(data.user);
        if (data.signature?.signature) {
          setSignature(data.signature);
        } else {
          setSignature("");
        }
      });
  };

  useEffect(() => {
    fetchDashData();
  }, []);

  const fetchData = () => {
    console.log("Fetch data");

    axios
      .get("https://docudash.net/api/getStartedWithDocudash", {
        headers: { Authorization: `Bearer ${Mobx.access_token}` },
      })
      .then((response) => {
        let ones = 0;
        let zeros = 0;

        const obj = response.data.data;
        setProgressBar(obj.percentage / 100);
        delete obj.percentage;
        setSetshowMeObj(obj);

        const key_array = Object.values(obj);
        key_array.forEach((element) => {
          if (element) {
            ones++;
          } else {
            zeros++;
          }
        });
        setCompleteNumber(ones);
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
  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["*/*"], // You can specify the file types here (e.g., 'image/*', 'application/pdf', etc.)
      });
      console.log(result);
    } catch (err) {
      console.log("err");
    }
  };
  return (
    <>
      <ScrollView>
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
            obj={setshowMeObj}
            steps={completeNumber}
          />
        </View>
        <View style={tw`items-center bg-[${colors.green}] py-10 gap-2`}>
          <View style={tw`flex-row items-center h-25`}>
            <ImageUploadModal
              _imageRef={imageRefFunc}
              image={userData?.profile_photo_url}
            />
            <Image
              style={tw`w-2.1 h-24 rounded-full mt-5 top--2 mx-2`}
              source={require("../../assets/WhiteLine.png")}
            />
            <View style={tw`h-[100%] justify-between  px-1 `}>
              <Text style={[styles.white_text, tw`font-semibold`]}>
                Signed by:
              </Text>

              {signature ? (
                <>
                  <Image
                    style={[tw` h-8`, { tintColor: "white" }]}
                    source={{ uri: signature?.signature }}
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
            <Box text={"Waiting for Others"} num={0} />
          </View>
          <View style={tw`flex-row items-center`}>
            <Box text={"Expiring Soon"} num={0} />
            <Box text={"Completed"} num={0} />
          </View>
        </View>

        <View style={tw`bg-white px-8 py-8`}>
          <View
            style={tw` border-2 py-10 rounded-xl border-dashed border-[${colors.blue}] justify-center items-center`}
          >
            <TouchableOpacity style={tw`p-1`} onPress={() => uploadFile()}>
              <Image
                style={tw`h-10 w-10 self-center`}
                source={require("../../assets/Upload.png")}
              />
              <Text style={tw`text-[${colors.blue}] mt-2`}>
                Drop documents here to get started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button onPress={() => uploadFile()}></Button>
      </ScrollView>
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
});
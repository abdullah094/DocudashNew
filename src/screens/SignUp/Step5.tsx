import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { clearAsync, getToken, storeData, storeToken } from "./AsynFunc";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import DropDown from "react-native-paper-dropdown";
import { Istep5Response, SignupStackScreenProps } from "../../../types";
import { number } from "mobx-state-tree/dist/internal";
import { storeTokenGlobal } from "../../AsyncGlobal";
import { useCounterStore } from "../../../MobX/TodoStore";

interface route {
  email: string;
}
interface Data {
  id: number;
  title: string;
  slug: string;
  order_at: number;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: Date;
  updated_at: Date;
}
interface dropDown {
  label: string;
  value: number;
}
const Step5 = () => {
  const navigation =
    useNavigation<SignupStackScreenProps<"Step5">["navigation"]>();
  const [password, setPassword] = useState<string | undefined>("");
  const [loader, setLoader] = useState<string | any>("Next");

  const [industry, setIndustry] = useState<dropDown[]>([]);
  const [reasons, setReasons] = useState<dropDown[]>([]);
  const [industryID, setIndustryID] = useState<string>("");
  const [reasonID, setReasonID] = useState<string>("");
  const [showDropDownIndustry, setShowDropDownIndustry] = useState(false);
  const [showDropDownReason, setShowDropDownReason] = useState(false);
  const mobX = useCounterStore();

  const fetchIndustry = () => {
    axios
      .get("https://docudash.net/api/set-ups/industries/")
      .then((response) => {
        const data: Data[] = response.data.data;
        setIndustry(
          data.map((x) => {
            return {
              label: x.title,
              value: x.id,
            };
          }) as dropDown[]
        );
        // if (data.length > 0) {
        //   setIndustryID(String(data[0].id));
        // }
      });
  };

  const fetchReasons = async () => {
    let _industry: Array<object> = [];
    axios
      .get("https://docudash.net/api/set-ups/signUpReasons/")
      .then((response) => {
        const data: Data[] = response.data.data;
        setReasons(
          data.map((x) => {
            return {
              label: x.title,
              value: x.id,
            };
          }) as dropDown[]
        );
        // if (data.length > 0) {
        //   setReasonID(String(data[0].id));
        // }
      });
  };
  useEffect(() => {
    fetchIndustry();
    fetchReasons();
  }, []);
  const fetchData = async () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    const token = await getToken();
    axios
      .post("https://docudash.net/api/sign-up-4/" + token, {
        industry_id: industryID,
        sign_up_reasons_id: reasonID,
      })
      .then((response) => {
        const {
          success = true,
          message,
          token,
        }: Istep5Response = response.data;
        if (success) {
          mobX.addAccessToken(token),
            setLoader("Next"),
            Alert.alert(message),
            storeTokenGlobal(token),
            clearAsync();
        }

        alert("Select both options"), setLoader("Next");
      })
      .catch((err) => {
        setLoader("Next");
      });
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1  `}>
      <View style={tw`flex-1 gap-2 justify-center px-10`}>
        <Image
          style={tw`w-75 h-35 self-center`}
          resizeMode="contain"
          source={require("../../assets/logo.png")}
        />
        <Text
          style={{
            fontFamily: "nunito-SemiBold",
            color: colors.blue,
            fontSize: 25,
            alignSelf: "center",
          }}
        >
          Finish your setup
        </Text>
        <Text
          style={[
            { fontFamily: "nunito-SemiBold" },
            tw`text-center text-[${colors.blue}] text-sm`,
          ]}
        >
          This helps personalize your account in the future
        </Text>

        <View>
          {industry && (
            <View
              style={tw`border-2 border-[${colors.green}] rounded-3xl overflow-hidden my-2`}
            >
              <DropDown
                mode={"flat"}
                placeholder="Your industry?"
                visible={showDropDownIndustry}
                inputProps={{ backgroundColor: "white", width: "100%" }}
                showDropDown={() => setShowDropDownIndustry(true)}
                onDismiss={() => setShowDropDownIndustry(false)}
                value={industryID}
                setValue={setIndustryID}
                list={industry}
              />
            </View>
          )}
          {reasons && (
            <View
              style={tw`border-2 border-[${colors.green}] rounded-3xl overflow-hidden mb-0`}
            >
              <DropDown
                mode={"flat"}
                placeholder={"Why did you signup?"}
                visible={showDropDownReason}
                inputProps={{ backgroundColor: "white", width: "100%" }}
                showDropDown={() => setShowDropDownReason(true)}
                onDismiss={() => setShowDropDownReason(false)}
                value={reasonID}
                setValue={setReasonID}
                list={reasons}
              />
            </View>
          )}
        </View>

        <GreenButton text={loader} onPress={fetchData} styles={{}} />
      </View>
    </ScrollView>
  );
};

export default Step5;

const styles = StyleSheet.create({});

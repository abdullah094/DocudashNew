import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { getToken, storeData } from "./AsynFunc";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import DropDown from "react-native-paper-dropdown";
import { SignupStackScreenProps } from "../../../types";

interface route {
  email: string;
}
const Step5 = ({ navigation, route }: SignupStackScreenProps<"Step5">) => {
  const [password, setPassword] = useState<string | undefined>("");
  const [loader, setLoader] = useState<string | any>("Next");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const industry = route.params.industry;
  const reasons = route.params.signUpReasons;
  const fetchData = async () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    const token = await getToken();
    axios
      .post("https://docudash.net/api/sign-up-3/" + token, {
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        response?.data.success
          ? (navigation.navigate("Index", {
              screen: "Step5",
            }),
            storeData("Step5"),
            setLoader("Next"))
          : (alert("Failed"), setLoader("Next"));
      })
      .catch((err) => {
        setLoader("Next");
      });
  };

  return (
    <ScrollView contentContainerStyle={tw`h-full  `}>
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

        <DropDown
          label={"Gender"}
          mode={"outlined"}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={gender}
          setValue={setGender}
          list={industry}
        />
        <Text style={tw`text-gray-400`}>
          * Must be at least 6 characters long. Must not contain the characters
          or spaces
        </Text>
        <GreenButton text={loader} onPress={fetchData} />
      </View>
    </ScrollView>
  );
};

export default Step5;

const styles = StyleSheet.create({});

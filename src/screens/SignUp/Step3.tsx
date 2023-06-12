import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SIGNUP_02 } from "@env";
import { BarIndicator } from "react-native-indicators";
import { getToken, storeData } from "./AsynFunc";
import { SignupStackScreenProps } from "../../../types";

const Step3 = ({ navigation, route }: SignupStackScreenProps<"Step3">) => {
  const [otp, setOtp] = useState<string | undefined>("");
  const [loader, setLoader] = useState<string | any>("Next");
  const fetchData = async () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    const token = await getToken();
    axios
      .post("https://docudash.net/api/sign-up-2/" + token, {
        verification_code: otp,
      })
      .then((response) => {
        console.log("top----", response.data);
        response?.data.success
          ? (setLoader("Next"),
            navigation.replace("Index", {
              screen: "Step4",
              params: {
                api: response.data.next,
              },
            }),
            storeData("Step4"))
          : (alert("Failed"), setLoader("Next"));
      })
      .catch((err) => {
        setLoader("Next");
      });
  };
  const ResendCode = () => {};

  return (
    <ScrollView contentContainerStyle={tw`h-full bg-white`}>
      <View style={tw`flex-1 gap-2 justify-center px-10`}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={150}
          behavior={"position"}
        >
          <Image
            style={tw`w-65 self-center`}
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
            Check your email
          </Text>
          <Text
            style={[
              { fontFamily: "nunito-SemiBold" },
              tw`text-center text-[${colors.blue}] text-base`,
            ]}
          >
            A temporary confirmation code was sent to shahzaibjaffri82@gmail.com
          </Text>

          <Input
            state={otp}
            setState={(text) => setOtp(text)}
            placeholder={"6 digit verification code"}
            style={tw`text-center`}
            keyboardType={"number-pad"}
          />
          <GreenButton text={loader} onPress={fetchData} />
          <TouchableOpacity style={tw`p-5`} onPress={ResendCode}>
            <Text style={tw`text-blue-700 text-center`}>Resend code</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Step3;

const styles = StyleSheet.create({});

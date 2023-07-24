import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
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
import { SignupStackScreenProps, Istep3Response } from "../../../types";
import { log } from "react-native-reanimated";

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
        const {
          success = true,
          message,
          token,
        }: Istep3Response = response.data;
        console.log("top----", response.data);

        if (success) {
          setLoader("Next"),
            navigation.replace("SignUpIndex", {
              screen: "Step4",
              params: {
                api: response.data.next,
              },
            }),
            storeData("Step4");
        } else {
          Alert.alert("Failed", "Wrong code Please try again or resend code"),
            setOtp(""),
            setLoader("Next");
        }
      })
      .catch((err) => {
        setLoader("Next");
      });
  };
  const ResendCode = async () => {
    const token = await getToken();
    axios
      .get("https://docudash.net/api/sendCodeAgain/" + token)
      .then((response) => {
        const data = response.data;

        if (data.success) {
          Alert.alert("Code sent to " + data.data.email);
        } else {
          Alert.alert("Please try again");
        }
      });
  };

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
            A temporary confirmation code was sent to your email
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

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
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

const Step3 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [otp, setOtp] = useState<string | undefined>("");
  const [loader, setLoader] = useState<string | any>("Next");
  const fetchData = () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    axios
      .post(SIGNUP_02, {
        verification_code: otp,
      })
      .then((response) => {
        response?.data.success
          ? (navigation.navigate("Index", {
              screen: "Step4",
            }),
            setLoader("Next"))
          : (alert("Failed"), setLoader("Next"));
      })
      .catch((err) => {
        setLoader("Next");
      });
  };
  return (
    <ScrollView contentContainerStyle={tw`h-full `}>
      <View style={tw`flex-1 gap-2 justify-center px-10`}>
        <Image
          style={tw`w-65 self-center`}
          resizeMode="contain"
          source={require("../../assets/docudash_pow_logo.png")}
        />
        <Text
          style={[
            { fontFamily: "nunito-SemiBold" },
            tw`text-center text-[${colors.blue}] text-xl`,
          ]}
        >
          Log In
        </Text>

        <Input
          state={otp}
          setState={() => setOtp}
          placeholder={"otp"}
          style={tw`text-center`}
          keyboardType={"number-pad"}
        />
        <GreenButton text={loader} onPress={fetchData} />
        <TouchableOpacity style={tw`self-center`}>
          <Text style={tw`text-blue-700`}>
            No account? Sign up free of charge
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step3;

const styles = StyleSheet.create({});

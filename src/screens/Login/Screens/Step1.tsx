import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Input from "../../../components/Input";
import GreenButton from "../../../components/GreenButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import { err } from "react-native-svg/lib/typescript/xml";
import { LoginStackScreenProps } from "../../../../types";

const Step1 = () => {
  const navigation =
    useNavigation<LoginStackScreenProps<"Step1">["navigation"]>();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState<string | any>("Next");
  const Next = () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    axios
      .post("https://docudash.net/api/log-in", {
        email: email,
      })
      .then((repsonse) => {
        console.log(repsonse.data);
        setLoader("Next");
        if (repsonse.data.success) {
          navigation.navigate("Step2", {
            token: repsonse.data.next_access,
            email: repsonse.data.data.email,
          });
        } else {
          if (repsonse.data.message?.email) {
            Alert.alert("Email not valid");
          } else {
            Alert.alert("Please try again");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setLoader("Next");
      });
  };
  return (
    <ScrollView contentContainerStyle={tw`h-full`}>
      <View style={tw`flex-1  bg-white gap-3 px-10 justify-center`}>
        <Image
          style={tw`w-50 h-10 rounded-sm self-center`}
          source={require("../../../assets/docudash_pow_logo.png")}
        />
        <Input
          state={email}
          setState={setEmail}
          placeholder={"Enter email address"}
          style={{}}
        />
        <GreenButton text={loader} onPress={Next} styles={{}} />
        <TouchableOpacity
          style={tw`self-center p-2`}
          onPress={() => navigation.navigate("SignUpIndex")}
        >
          <Text style={tw`text-blue-700`}>No account? Signup for free</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step1;

const styles = StyleSheet.create({});

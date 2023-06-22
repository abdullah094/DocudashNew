import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Input from "../../../components/Input";
import GreenButton from "../../../components/GreenButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Step2 = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");

  const LoginButton = () => {
    axios.post("");
  };
  return (
    <ScrollView contentContainerStyle={tw`h-full`}>
      <View style={tw`flex-1  bg-white gap-3 px-10 justify-center`}>
        <Image
          style={tw`w-50 h-10 rounded-sm self-center`}
          source={require("../../../assets/docudash_pow_logo.png")}
        />
        <Input
          state={password}
          setState={setPassword}
          placeholder={"Enter password"}
          style={{}}
        />
        <GreenButton
          text={"Login"}
          onPress={() => navigation.navigate("Step2")}
          styles={{}}
        />
      </View>
    </ScrollView>
  );
};

export default Step2;

const styles = StyleSheet.create({});

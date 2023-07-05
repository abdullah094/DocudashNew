import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { JSXElementConstructor, useState } from "react";
import tw from "twrnc";
import Input from "../../../components/Input";
import GreenButton from "../../../components/GreenButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { LoginStackScreenProps } from "../../../../types";
import { BarIndicator } from "react-native-indicators";
import { storeTokenGlobal } from "../../../AsyncGlobal";
import { useCounterStore } from "../../../../MobX/TodoStore";

const Step2 = () => {
  const [loader, setLoader] = useState<string | JSX.Element>("Login");
  const navigation =
    useNavigation<LoginStackScreenProps<"Step2">["navigation"]>();
  const route = useRoute<LoginStackScreenProps<"Step2">["route"]>();
  const { token, email } = route.params;
  const Mobx = useCounterStore();
  const [password, setPassword] = useState("");

  const LoginButton = async () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    await axios
      .post("https://docudash.net/api/log-in/" + token, {
        email: email,
        password: password,
      })
      .then((response) => {
        setLoader("Login");
        if (response.data.success) {
          storeTokenGlobal(response.data.token);
          Mobx.addAccessToken(response.data.token);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.response.data.message);
        setLoader("Login");
        console.log(error);
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
          state={password}
          setState={setPassword}
          placeholder={"Enter password"}
          style={{}}
        />
        <GreenButton text={loader} onPress={LoginButton} styles={{}} />
      </View>
    </ScrollView>
  );
};

export default Step2;

const styles = StyleSheet.create({});

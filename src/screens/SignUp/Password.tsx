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
import Input from "../../components/Input";
import GreenButton from "../../components/GreenButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { LoginStackScreenProps, SignUpStackScreenProps } from "../../../types";
import { BarIndicator } from "react-native-indicators";
import { storeTokenGlobal } from "../../AsyncGlobal";
import { useCounterStore } from "../../../MobX/TodoStore";

const PasswordScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<SignUpStackScreenProps<"Step5">["navigation"]>();
  const route = useRoute<SignUpStackScreenProps<"Step5">["route"]>();
  const { token, email } = route.params;
  const Mobx = useCounterStore();
  const [password, setPassword] = useState<string>("");

  const LoginButton = async () => {
    setLoading(true);
    await axios
      .post("https://docudash.net/api/log-in/" + token, {
        email: email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        setLoading(false);
        if (data.success) {
          storeTokenGlobal(data.token);
          Mobx.addAccessToken(data.token);
        } else {
          Alert.alert(data.message.password[0]);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.response.data.message.password[0]);
        setLoading(false);
        console.log(error);
        Alert.alert(error.message);
      });
  };
  return (
    <ScrollView contentContainerStyle={tw`h-full`}>
      <View style={tw`flex-1  bg-white gap-3 px-10 justify-center`}>
        <Image
          style={tw`w-50 h-10 rounded-sm self-center`}
          source={require("../../assets/docudash_pow_logo.png")}
        />
        <Input
          state={password}
          secureTextEntry
          setState={setPassword}
          placeholder={"Enter password"}
          style={{}}
        />
        <GreenButton
          loading={loading}
          text={"Login"}
          onPress={LoginButton}
          styles={{}}
        />
      </View>
    </ScrollView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({});

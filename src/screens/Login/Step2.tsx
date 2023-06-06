import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SIGNUP_1 } from "@env";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import tw from "twrnc";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import { useNavigation } from "@react-navigation/native";

const Step2 = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string | undefined>("");
  const [loader, setLoader] = useState<string | any>("Get Started");
  const fetchData = () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    axios
      .post(SIGNUP_1, {
        email: email,
      })
      .then((response) => {
        setLoader("Get Started");
        navigation.navigate("Index", {
          screen: "Step3",
          params: { email: email?.toLowerCase() },
        });
      })
      .catch((err) => {
        setLoader("Get Started");
      });
  };
  return (
    <ScrollView contentContainerStyle={tw`h-full items-center`}>
      <View style={tw`flex-1 gap-2 justify-center`}>
        <Image
          style={tw`w-65`}
          resizeMode="contain"
          source={require("../../assets/docudash_pow_logo.png")}
        />
        <Text
          style={[
            { fontFamily: "nunito-SemiBold" },
            tw`text-center text-[${colors.blue}] text-xl`,
          ]}
        >
          Login
        </Text>
        <Input
          state={email}
          setState={setEmail}
          placeholder={"email"}
          style={{}}
        />
        <GreenButton text="Next" onPress={fetchData} />
        <TouchableOpacity>
          <Text style={tw`text-blue-700`}>
            No account? Sign up free of charge
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step2;

const styles = StyleSheet.create({});

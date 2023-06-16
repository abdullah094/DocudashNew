import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, SetStateAction, FC } from "react";
import { SIGNUP_1 } from "@env";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import tw from "twrnc";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import { useCounterStore } from "../../../MobX/TodoStore";
import { useRoute } from "@react-navigation/native";
import { storeData, getToken } from "./AsynFunc";
import { observer } from "mobx-react-lite";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SignupStackScreenProps } from "../../../types";

interface form {
  first_Name: SetStateAction<string | undefined>;
  last_Name: SetStateAction<string | undefined>;
  phone: SetStateAction<string | undefined>;
}
const Step2 = ({ navigation, route }: SignupStackScreenProps<"Step2">) => {
  const { count, increment, decrement, access_token } = useCounterStore();
  const [fontsLoaded] = useFonts({
    Signature: require("../../assets/Fonts/Creattion.otf"),
  });

  const [form, setForm] = useState<form>({
    first_Name: "",
    last_Name: "",
    phone: "",
  });

  const [loader, setLoader] = useState<string | any>("Next");
  const fetchData = async () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );

    const token = await getToken();

    axios
      .post("https://docudash.net/api/sign-up-1/" + token, {
        first_name: form.first_Name,
        last_name: form.last_Name,
        phone: form.phone,
      })
      .then((response) => {
        console.log("top----", response.data);
        response?.data.success
          ? (setLoader("Next"),
            navigation.replace("SignUpIndex", {
              screen: "Step3",
              params: {
                api: response.data.next,
              },
            }),
            storeData("Step3"))
          : (alert("Failed"), setLoader("Next"));
      })
      .catch((err) => {
        setLoader("Next");
      });
  };
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={tw`h-full `}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`flex-1 gap-3 justify-center px-10 bg-white `}>
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
            Let's start!
          </Text>
          <Text
            style={{
              fontFamily: "nunito-SemiBold",
              color: colors.blue,
              fontSize: 15,
              alignSelf: "center",
            }}
          >
            Lets's get the basics. Enter your info below
          </Text>
          <View style={tw`flex-row  justify-between `}>
            <Input
              state={form.first_Name}
              setState={(text) => setForm({ ...form, first_Name: text })}
              placeholder={"first name"}
              keyboardType={"default"}
              style={{ flex: 0.47 }}
            />
            <Input
              state={form.last_Name}
              setState={(text) => setForm({ ...form, last_Name: text })}
              placeholder={"last name"}
              keyboardType={"default"}
              style={{ flex: 0.47 }}
            />
          </View>
          <Input
            state={form.phone}
            setState={(text) => setForm({ ...form, phone: text })}
            placeholder={"phone"}
            keyboardType={"number-pad"}
            style={{}}
          />
          <View style={tw`flex-row justify-between items-center `}>
            <Image
              style={tw`w-30 self-center top-3`}
              resizeMode="contain"
              source={require("../../assets/logo.png")}
            />
            <View
              style={tw`w-30  h-20 border-b-2  border-gray-400 justify-end py-3 items-center`}
            >
              <Text style={{ fontFamily: "Signature", fontSize: 28 }}>
                {`${form.first_Name}${form.last_Name}`}
              </Text>
              <Text style={[tw`text-xs font-thin absolute bottom--5 left-0`]}>
                Signature
              </Text>
            </View>
          </View>
          <GreenButton
            text={loader}
            onPress={fetchData}
            styles={tw`px-8 mt-8`}
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};
export default Step2;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
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
import {
  LoginStackScreenProps,
  SignUpAPI,
  SignUpStackScreenProps,
} from "../../../types";

interface form {
  first_Name: SetStateAction<string | undefined>;
  last_Name: SetStateAction<string | undefined>;
  phone: SetStateAction<string | undefined>;
}
const UserInfoScreen = () => {
  const navigation =
    useNavigation<LoginStackScreenProps<"Step2">["navigation"]>();
  const route = useRoute<LoginStackScreenProps<"Step2">["route"]>();
  const { count, increment, decrement, access_token } = useCounterStore();
  const [fontsLoaded] = useFonts({
    Signature: require("../../assets/Fonts/Creattion.otf"),
  });

  const [form, setForm] = useState<form>({
    first_Name: "",
    last_Name: "",
    phone: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    setLoading(true);
    const token = await getToken();
    axios
      .post("https://docudash.net/api/sign-up-1/" + token, {
        first_name: form.first_Name,
        last_name: form.last_Name,
        phone: form.phone,
      })
      .then((response) => {
        const { data, success, next_access, message, next }: SignUpAPI =
          response.data;

        console.log("NameScreen", data);
        if (success) {
          setLoading(false),
            navigation.replace("SignUpIndex", {
              screen: "Step" + data.steps,
              params: {
                api: next,
              },
            }),
            storeData("Step" + data.steps);
        } else {
          if (message.first_name) {
            Alert.alert(message.first_name[0]);
          } else if (message.last_name) {
            Alert.alert(message.last_name[0]);
          } else if (message.phone) {
            Alert.alert(message.phone[0]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={tw`h-full`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`flex-1 gap-3 justify-center px-10 bg-white `}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={150}
          // behavior={"position"}
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
            loading={loading}
            text={"Next"}
            onPress={fetchData}
            styles={tw`px-8 mt-8`}
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};
export default UserInfoScreen;

const styles = StyleSheet.create({});

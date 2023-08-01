import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import GreenButton from "../../components/GreenButton";
import { Checkbox } from "react-native-paper";
import tw from "twrnc";
import {
  NavigationProp,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { SIGNUP_0 } from "@env";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import { storeData, getData, storeToken } from "./AsynFunc";
import { RootStackParamList, SignupStackScreenProps } from "../../../types";

const Step1 = () => {
  const navigation =
    useNavigation<SignupStackScreenProps<"Step1">["navigation"]>();
  const [inputVal, setInputVal] = useState<string | undefined>("");
  const [checked, setChecked] = useState(0);

  const [loader, setLoader] = useState<string | any>("Get Started");

  const fetchData = () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    axios
      .post(SIGNUP_0, {
        email: inputVal?.toLowerCase(),
        checkAgree: checked,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        data.success
          ? (setLoader("Get Started"),
            navigation.replace("SignUpIndex", {
              screen: "Step2",
              params: {
                api: data.next,
              },
            }),
            storeToken(data.next_access),
            storeData("Step2"),
            console.log(data))
          : data.message.email
          ? Alert.alert(data.message.email[0])
          : Alert.alert(JSON.stringify(data.message));

        setLoader("Get Started");
      })
      .catch((err) => {
        setLoader("Get Started");
      });
  };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 items-center justify-center pb-20 bg-white`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`px-14`}>
        <Text
          style={{
            fontFamily: "nunito-SemiBold",
            color: colors.blue,
            fontSize: 25,
          }}
        >
          Try Docudash free for 30 days
        </Text>
        <Text style={{ fontFamily: "nunito-SemiBold", fontSize: 15 }}>
          No credit card required
        </Text>
        <Input
          state={inputVal}
          setState={setInputVal}
          placeholder="Email"
          style={{}}
        />
        <View style={tw`flex-row mt-5 w-[${"100%"}] items-start`}>
          <View
            style={[
              tw`border-2 rounded-lg border-gray-400 mx-2 bg-[${"#F6F6F6"}]`,
              Platform.OS === "android" ? tw`border-0` : null,
            ]}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(checked ? 0 : 1);
              }}
            />
          </View>
          <Text style={styles.soft_text}>
            I agree to receive marketing communications from Docudash and
            acknowledge that I can opt out at any time by visiting the
            Preference Centre.
          </Text>
        </View>
        <Text style={[styles.soft_text, tw`mt-5`]}>
          By clicking the Get Started button below, you agree to the Terms &
          Conditions and Privacy Policy.
        </Text>
        <GreenButton text={loader} onPress={fetchData} />
      </View>
    </ScrollView>
  );
};

export default Step1;

const styles = StyleSheet.create({
  soft_text: tw` text-gray-500 `,
});

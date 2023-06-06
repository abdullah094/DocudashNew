import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import GreenButton from "../../components/GreenButton";
import { Checkbox } from "react-native-paper";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { SIGNUP_0 } from "@env";
import axios from "axios";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

const Step1 = () => {
  const navigation = useNavigation();
  const [inputVal, setInputVal] = useState<string | undefined>("");
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState<string | any>("Get Started");
  const fetchData = () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    axios
      .post(SIGNUP_0, {
        email: inputVal,
        checkAgree: checked,
      })
      .then((response) => {
        setLoader("Get Started");
        navigation.navigate("Index", { screen: "Step2" });
      })
      .catch((err) => {
        setLoader("Get Started");
      });
  };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 items-center justify-center pb-20`}
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
            style={tw`border-2 rounded-lg border-gray-400 mx-2 bg-[${"#F6F6F6"}]`}
          >
            <Checkbox
              color={colors.green}
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
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

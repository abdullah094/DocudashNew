import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { getToken, storeData } from "./AsynFunc";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import { SignupStackScreenProps, iStep4 } from "../../../types";

interface route {
  email: string;
}
const Step4 = ({ navigation, route }: SignupStackScreenProps<"Step4">) => {
  // const navigation = useNavigation<SignupStackScreenProps<"Step4">>();

  const [password, setPassword] = useState<string | undefined>("");
  const [loader, setLoader] = useState<string | any>("Next");
  const fetchData = async () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    const token = await getToken();
    axios
      .post("https://docudash.net/api/sign-up-3/" + token, {
        password: password,
      })
      .then((response) => {
        const data: iStep4 = response.data;
        console.log(data.success);
        if (data.success) {
          navigation.push("SignUpIndex", {
            screen: "Step5",
            params: {
              industry: data.industries,
              signUpReasons: data.signUpReasons,
            },
          });
          storeData("Step5");
          setLoader("Next");
        } else {
          alert("Try again"), setLoader("Next");
        }
      })
      .catch((err) => {
        setLoader("Next");
      });
  };

  return (
    <ScrollView contentContainerStyle={tw`h-full  `}>
      <View style={tw`flex-1 gap-2 justify-center px-10`}>
        <Image
          style={tw`w-75 h-35 self-center`}
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
          Set you password
        </Text>
        <Text
          style={[
            { fontFamily: "nunito-SemiBold" },
            tw`text-center text-[${colors.blue}] text-base`,
          ]}
        >
          Your account login will be
        </Text>

        <Input
          state={password}
          setState={(val) => setPassword(val)}
          placeholder={"Enter your password"}
          style={{}}
          keyboardType={undefined}
        />
        <Text style={tw`text-gray-400`}>
          * Must be at least 6 characters long. Must not contain the characters
          or spaces
        </Text>
        <GreenButton text={loader} onPress={fetchData} styles={{}} />
      </View>
    </ScrollView>
  );
};

export default Step4;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

interface route {
  email: string;
}
const Step4 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params as route;
  const [otp, setOtp] = useState<string | undefined>("");
  return (
    <ScrollView contentContainerStyle={tw`h-full  `}>
      <View style={tw`flex-1 gap-2 justify-center px-10`}>
        <Image
          style={tw`w-65 self-center`}
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

        <Text style={tw`text-gray-500 text-center`}>
          Enter the code from your email: <Text>{email}</Text>
        </Text>

        <Input
          state={otp}
          setState={setOtp}
          placeholder={"otp"}
          style={{ textAlign: "center" }}
        />
        <GreenButton
          text="Login"
          onPress={() =>
            navigation.navigate("Index", {
              screen: "Step5",
            })
          }
        />
        <TouchableOpacity>
          <Text style={tw`text-blue-700 text-center`}>Resend code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step4;

const styles = StyleSheet.create({});

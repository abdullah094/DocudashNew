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
const Step3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params as route;

  const [password, setPassword] = useState<string | undefined>("");
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
          Log In
        </Text>
        <Text style={tw`text-sm text-gray-500 text-center`}>{email}</Text>
        <Input
          state={password}
          setState={setPassword}
          placeholder={"password"}
        />
        <GreenButton
          text="Next"
          onPress={() =>
            navigation.navigate("Index", {
              screen: "Step4",
              params: { email: email },
            })
          }
        />
        <TouchableOpacity>
          <Text style={tw`text-blue-700`}>
            No account? Sign up free of charge
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step3;

const styles = StyleSheet.create({});

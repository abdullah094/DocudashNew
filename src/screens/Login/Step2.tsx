import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SIGNUP_1 } from "@env";
import axios from "axios";
import { BarIndicator } from "react-native-indicators";
import tw from "twrnc";
import GreenButton from "../../components/GreenButton";
import Input from "../../components/Input";
import { colors } from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import { useCounterStore } from "../../../MobX/TodoStore";
import { observer } from "mobx-react-lite";

const Step2 = observer(() => {
  const { count, increment, decrement, access_token } = useCounterStore();
  console.log(count);

  const _increment = () => {
    increment();
  };

  const navigation = useNavigation();
  const [form, setForm] = useState<string | undefined | object | any>({
    first_Name: "",
    last_Name: "",
    phone: "",
  });

  const [loader, setLoader] = useState<string | any>("Next");
  const fetchData = () => {
    setLoader(
      <View style={tw`pt-1`}>
        <BarIndicator color="white" size={20} />
      </View>
    );
    axios
      .post(SIGNUP_1, {
        first_name: form.first_Name,
        last_name: form.last_Name,
        phone: form.phone,
      })
      .then((response) => {
        console.log(response.data);
        // response?.data.success
        //   ? (navigation.navigate("Index", {
        //       screen: "Step3",
        //     }),
        //     setLoader("Next"))
        //   : (alert("Failed"), setLoader("Next"));
      })
      .catch((err) => {
        setLoader("Next");
      });
  };

  return (
    <ScrollView
      contentContainerStyle={tw`h-full `}
      keyboardShouldPersistTaps="handled"
    >
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
        <Input
          state={form.first_Name}
          setState={(text) =>
            setForm((prev) => ({ ...prev, first_Name: text }))
          }
          placeholder={"first name"}
          keyboardType={"default"}
          style={{}}
        />
        <Input
          state={form.last_Name}
          setState={(text) => setForm((prev) => ({ ...prev, last_Name: text }))}
          placeholder={"last name"}
          keyboardType={"default"}
          style={{}}
        />
        <Input
          state={form.phone}
          setState={(text) => setForm((prev) => ({ ...prev, phone: text }))}
          placeholder={"phone"}
          keyboardType={"number-pad"}
          style={{}}
        />
        <GreenButton text={loader} onPress={fetchData} />
        <TouchableOpacity style={tw`self-center`}>
          <Text style={tw`text-blue-700`}>
            No account? Sign up free of charge
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});
export default Step2;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { SetStateAction, Dispatch } from "react";
import { colors } from "../Colors";
import tw from "twrnc";
interface props {
  state: string | number | undefined;
  setState: Dispatch<React.SetStateAction<string | undefined>>;
  placeholder: string;
  style: object;
}
const Input = (props: props) => {
  const { state, setState, placeholder, style } = props;

  return (
    <TextInput
      value={String(state)}
      onChangeText={(value: string) => setState(value)}
      placeholder={placeholder}
      style={[
        {
          borderWidth: 2,
          borderRadius: 20,
          borderColor: colors.green,
          paddingHorizontal: 15,
          height: 45,
          marginTop: 20,
          color: "black",
          backgroundColor: "#F6F6F6",
          ...style,
        },
        tw`h-11`,
      ]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});

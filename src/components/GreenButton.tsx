import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { colors } from "../Colors";
import { Button } from "react-native-paper";
interface props {
  text: string | JSX.Element;
  onPress: () => void;
  styles?: object;
  loading: boolean;
}
const GreenButton = (props: props) => {
  const { text, onPress, styles = {}, loading = false } = props;
  return (
    <Button
      mode="contained"
      loading={loading}
      disabled={loading}
      onPress={onPress}
      style={[tw` mt-4 h-11 `, styles]}
    >
      {text}
    </Button>
  );
};

export default GreenButton;

const styles = StyleSheet.create({});

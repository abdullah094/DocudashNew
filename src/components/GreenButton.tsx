import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
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

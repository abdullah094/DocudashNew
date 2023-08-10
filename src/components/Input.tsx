import React, { Dispatch, SetStateAction, useState } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import tw from 'twrnc';
interface props {
  state: string | number | undefined | SetStateAction<string | undefined>;
  setState: Dispatch<React.SetStateAction<string>> | string;
  placeholder: string;
  style?: StyleProp<ViewStyle> | object;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}
const Input = (props: props) => {
  const {
    state,
    setState,
    placeholder,
    style = {},
    keyboardType = 'default',
    secureTextEntry = false,
  } = props;

  const [safe, setSafe] = useState(secureTextEntry);

  return (
    <TextInput
      value={String(state)}
      onChangeText={setState}
      keyboardType={keyboardType}
      placeholder={placeholder}
      mode="outlined"
      outlineStyle={tw`rounded-full`}
      secureTextEntry={safe}
      right={secureTextEntry ? <TextInput.Icon icon="eye" onPress={() => setSafe(!safe)} /> : null}
      style={{
        height: 56,
        marginTop: 20,
        ...style,
      }}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});

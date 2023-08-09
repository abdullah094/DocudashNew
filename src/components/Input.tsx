import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React, { SetStateAction, Dispatch, FC, FunctionComponent } from 'react';
import { colors } from '../Colors';
import tw from 'twrnc';
interface props {
  state: string | number | undefined | SetStateAction<string | undefined>;
  setState: Dispatch<React.SetStateAction<string>>;
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

  return (
    <TextInput
      value={String(state)}
      onChangeText={setState}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[
        {
          borderWidth: 2,
          borderRadius: 20,
          borderColor: colors.green,
          paddingHorizontal: 15,
          height: 45,
          marginTop: 20,
          color: 'black',
          backgroundColor: '#F6F6F6',
          ...style,
        },
        tw`h-11`,
      ]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});

import React, { Dispatch, SetStateAction } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { colors } from '../Colors';
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

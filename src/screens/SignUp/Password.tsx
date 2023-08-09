import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import tw from 'twrnc';
import { useCounterStore } from '../../../MobX/TodoStore';
import { SignUpStackScreenProps } from '../../../types';
import { storeTokenGlobal } from '../../AsyncGlobal';
import GreenButton from '../../components/GreenButton';
import Input from '../../components/Input';

const PasswordScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<SignUpStackScreenProps<'Step5'>['navigation']>();
  const route = useRoute<SignUpStackScreenProps<'Step5'>['route']>();
  const { token, email } = route.params;
  const Mobx = useCounterStore();
  const [password, setPassword] = useState<string>('');

  const LoginButton = async () => {
    setLoading(true);
    await axios
      .post('https://docudash.net/api/log-in/' + token, {
        email: email,
        password: password,
      })
      .then((response) => {
        const { token, success, message }: { token: string; success: boolean; message: any } =
          response.data;
        console.log(response.data);
        setLoading(false);
        if (success) {
          storeTokenGlobal(token);
          Mobx.addAccessToken(token);
        } else {
          Alert.alert(message);
        }
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
        setLoading(false);
        console.log(error);
        Alert.alert(error.message);
      });
  };
  return (
    <ScrollView contentContainerStyle={tw`h-full`}>
      <View style={tw`flex-1 bg-white gap-3 px-10 justify-center`}>
        <Image
          style={tw`w-50 h-10 rounded-sm self-center`}
          source={require('../../assets/docudash_pow_logo.png')}
        />
        <Input
          state={password}
          secureTextEntry
          setState={setPassword}
          placeholder={'Enter password'}
          style={{}}
        />
        <GreenButton loading={loading} text={'Login'} onPress={LoginButton} styles={{}} />
      </View>
    </ScrollView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({});

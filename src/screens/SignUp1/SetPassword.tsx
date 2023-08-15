import GreenButton from '@components/GreenButton';
import Input from '@components/Input';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SignUpStackScreenProps, iStep4 } from '@type/index';
import { getToken, storeData } from '@utils/AsyncFunc';
import { colors } from '@utils/Colors';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

interface route {
  email: string;
}
const SetPasswordScreen = () => {
  const navigation = useNavigation<SignUpStackScreenProps<'Step3'>['navigation']>();
  const route = useRoute<SignUpStackScreenProps<'Step3'>['route']>();

  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    setLoading(true);
    const token = await getToken();
    axios
      .post('https://docudash.net/api/sign-up-3/' + token, {
        password: password,
      })
      .then((response) => {
        const { data, success, message }: iStep4 = response.data;
        console.log('PasswordScreen', data);
        if (success) {
          //@ts-ignore
          navigation.replace('SignUpIndex', {
            screen: ('Step' + data.steps) as any,
            params: {
              industry: data.industries,
              signUpReasons: data.signUpReasons,
            },
          });
          storeData('Step' + data.steps);
          setLoading(false);
        } else {
          alert(message.password[0]), setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={tw`h-full `}>
      <View style={tw`flex-1 bg-white gap-2 justify-center px-10`}>
        <Image
          style={tw`w-75 h-35 self-center`}
          resizeMode="contain"
          source={require('@assets/logo.png')}
        />
        <Text
          style={{
            fontFamily: 'nunito-SemiBold',
            color: colors.blue,
            fontSize: 25,
            alignSelf: 'center',
          }}
        >
          Set you password
        </Text>
        <Text
          style={[
            { fontFamily: 'nunito-SemiBold' },
            tw`text-center text-[${colors.blue}] text-base`,
          ]}
        >
          Your account login will be
        </Text>

        <Input
          state={password}
          setState={(val) => setPassword(val)}
          placeholder={'Enter your password'}
          style={{}}
          keyboardType={undefined}
        />
        <Text style={tw`text-gray-400`}>
          * Must be at least 6 characters long. Must not contain the characters or spaces
        </Text>
        <GreenButton loading={loading} text={'Next'} onPress={fetchData} styles={{}} />
      </View>
    </ScrollView>
  );
};

export default SetPasswordScreen;

const styles = StyleSheet.create({});

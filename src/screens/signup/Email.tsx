import GreenButton from '@components/GreenButton';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { SignUpAPI, SignUpStackScreenProps } from '@type/index';
import { storeData, storeToken } from '@utils/AsyncFunc';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import tw from 'twrnc';

const EmailScreen = () => {
  const navigation = useNavigation<SignUpStackScreenProps<'Index'>['navigation']>();
  const route = useNavigation<SignUpStackScreenProps<'Index'>['route']>();
  const [inputVal, setInputVal] = useState<string>('');
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = () => {
    setLoading(true);
    axios
      .post('https://docudash.net/api/sign-up', {
        email: inputVal?.toLowerCase(),
        checkAgree: checked,
      })
      .then((response) => {
        const { data, success, next_access, message, next }: SignUpAPI = response.data;
        console.log('emailScreen', response.data);
        if (success) {
          if (data.steps === 5) {
            navigation.navigate('SignUpIndex', {
              screen: ('Step' + data.steps) as any,
              params: {
                api: next,
                email: data.email,
              },
            });
          } else {
            navigation.replace('SignUpIndex', {
              screen: ('Step' + data.steps) as any,
              params: {
                api: next,
                email: data.email,
              },
            });
          }
          storeToken(next_access);
          storeData('Step' + data.steps);
        } else {
          // @ts-ignore
          message.email ? Alert.alert(message.email[0]) : Alert.alert(JSON.stringify(message));
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 items-center justify-center  bg-white`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw` px-14 `}>
        <Text
          style={{
            fontFamily: 'nunito-SemiBold',
            fontSize: 25,
          }}
        >
          Try Docudash free for 30 days
        </Text>
        <Text style={{ fontFamily: 'nunito-SemiBold', fontSize: 15 }}>No credit card required</Text>
        <Input state={inputVal} setState={setInputVal} placeholder="Email" />
        <View style={tw`flex-row mt-5 w-[${'100%'}] items-start`}>
          <View
            style={[
              tw`border-2 rounded-lg border-gray-400 mx-2 bg-[${'#F6F6F6'}]`,
              Platform.OS === 'android' ? tw`border-0` : null,
            ]}
          >
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(checked ? 0 : 1);
              }}
            />
          </View>
          <Text style={styles.soft_text}>
            I agree to receive marketing communications from Docudash and acknowledge that I can opt
            out at any time by visiting the Preference Centre.
          </Text>
        </View>
        <Text style={[styles.soft_text, tw`mt-5`]}>
          By clicking the Get Started button below, you agree to the Terms & Conditions and Privacy
          Policy.
        </Text>
        <GreenButton loading={loading} text={'Get Started'} onPress={fetchData} />
      </View>
    </ScrollView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  soft_text: tw` text-gray-500 `,
});

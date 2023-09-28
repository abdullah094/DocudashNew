import GreenButton from '@components/GreenButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setAccessToken } from '@stores/Slices';
import { Istep5Response, SignUpStackScreenProps } from '@type/index';
import { clearAsync, getToken } from '@utils/AsyncFunc';
import { storeTokenGlobal } from '@utils/AsyncGlobal';
import { colors } from '@utils/Colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';

interface route {
  email: string;
}
interface Data {
  id: number;
  title: string;
  slug: string;
  order_at: number;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: Date;
  updated_at: Date;
}
interface dropDown {
  label: string;
  value: number;
}
const CreateARequest = () => {
  const navigation = useNavigation<SignUpStackScreenProps<'Step4'>['navigation']>();
  const route = useRoute<SignUpStackScreenProps<'Step4'>['route']>();
  const [password, setPassword] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [industryID, setIndustryID] = useState<string>('');
  const [timeVal, setTimeVal] = useState<string>('');
  const [reasonID, setReasonID] = useState<string>('');
  const [showDropDownIndustry, setShowDropDownIndustry] = useState(false);
  const [timeDropdown, setTimeDropdown] = useState(false);
  const dispatch = useDispatch();
  const [fromTo, setFromTo] = useState<String | undefined>();
  const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
  });

  let dataRange = [date.fromDate, date.toDate];
  console.log(date.fromDate);

  const reasons = [
    {
      label: 'Notary Document (legal Document)',
      value: '1',
    },
    {
      label: 'Lawsuit',
      value: '2',
    },
    {
      label: 'Agreement',
      value: '3',
    },
    {
      label: 'Immigration',
      value: '4',
    },
    {
      label: 'Civil document',
      value: '5',
    },
    {
      label: 'Latter services',
      value: '6',
    },
    {
      label: 'Apostle',
      value: '7',
    },
    {
      label: 'Transcript Notarisation',
      value: '8',
    },
    {
      label: 'Real-estate/mortgage',
      value: '9',
    },
    {
      label: 'Contrastation',
      value: '10',
    },
    {
      label: 'Other',
      value: '11',
    },
  ];

  const time = [
    {
      label: 'Early Morning 6 AM to 9 AM',
      value: '1',
    },
    {
      label: 'Morning 9 AM to 12 PM',
      value: '2',
    },
    {
      label: 'Afternoon 12 PM to 3 PM',
      value: '3',
    },
    {
      label: 'Late Afternoon 3 PM to 6 PM',
      value: '4',
    },
    {
      label: 'Evening 6 PM to 9 PM',
      value: '5',
    },
  ];

  const sendData = async () => {
    setLoading(true);
    const token = await getToken();
    axios
      .post('https://docudash.net/api/create-request', {
        industry_id: industryID,
        sign_up_reasons_id: reasonID,
      })
      .then((response) => {
        const { success, message, token }: Istep5Response = response.data;
        if (success) {
          dispatch(setAccessToken(token));
          setLoading(false);
          Alert.alert(message);
          storeTokenGlobal(token);
          clearAsync();
        } else {
          setLoading(false);
          // @ts-ignore
          if (message.industry_id) {
            // @ts-ignore
            Alert.alert(message.industry_id[0]);
          }
          // @ts-ignore
          if (message.sign_up_reasons_id) {
            // @ts-ignore
            Alert.alert(message.sign_up_reasons_id[0]);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={tw`py-20 pb-30`}>
      <View style={tw`gap-3 justify-center px-10`}>
        <Image
          style={tw`w-70 h-30 self-center`}
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
          Create A Request
        </Text>
        <Text
          style={[{ fontFamily: 'nunito-SemiBold' }, tw`text-center text-[${colors.blue}] text-sm`]}
        >
          Reason
        </Text>

        <View style={tw`border-2 border-[${colors.green}] rounded-3xl overflow-hidden my-2`}>
          <DropDown
            mode={'flat'}
            placeholder="Reason of Request"
            visible={showDropDownIndustry}
            inputProps={{ backgroundColor: 'white', width: '100%' }}
            showDropDown={() => setShowDropDownIndustry(true)}
            onDismiss={() => setShowDropDownIndustry(false)}
            value={industryID}
            setValue={setIndustryID}
            list={reasons}
          />
        </View>
        <Text style={styles.heading}>Availabily Date</Text>
        <View style={tw`flex-row justify-center gap-4 `}>
          <Button
            loading={fromTo === 'From' ? true : false}
            onPress={() => setFromTo('From')}
            mode="contained"
          >
            From
          </Button>
          <Button
            loading={fromTo === 'To' ? true : false}
            onPress={() => setFromTo('To')}
            mode="contained"
          >
            To
          </Button>
        </View>

        <View style={tw`flex-row gap-4 justify-center`}>
          <Text>From: {date.fromDate}</Text>
          <Text>To: {date.toDate}</Text>
        </View>

        <View style={tw`border-2 border-[${colors.green}] rounded-3xl overflow-hidden my-2`}>
          <DropDown
            mode={'flat'}
            placeholder="What shift you want?"
            visible={timeDropdown}
            inputProps={{ backgroundColor: 'white', width: '100%' }}
            showDropDown={() => setTimeDropdown(true)}
            onDismiss={() => setTimeDropdown(false)}
            value={timeVal}
            setValue={setTimeVal}
            list={time}
          />
        </View>

        <View style={tw`flex-row gap-4 justify-center`}>
          <GreenButton
            loading={false}
            text={'Previous'}
            onPress={() => navigation.goBack()}
            styles={tw`bg-gray-400`}
          />
          <GreenButton loading={loading} text={'Next'} onPress={sendData} styles={{}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateARequest;

const styles = StyleSheet.create({
  heading: tw`text-4 font-bold`,
});

import GreenButton from '@components/GreenButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setAccessToken } from '@stores/Slices';
import { Istep5Response, SignUpStackScreenProps } from '@type/index';
import { clearAsync, getToken } from '@utils/AsyncFunc';
import { storeTokenGlobal } from '@utils/AsyncGlobal';
import { colors } from '@utils/Colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Chip,
  Divider,
  Menu,
  ProgressBar,
  SegmentedButtons,
  Text,
  TextInput,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import CalendarPicker from 'react-native-calendar-picker';
import UploadView from '@components/UploadView';
import RequestMessage from '@components/RequestMessage';
import RequestReason from '@components/RequestReason';
import HomeHeader from '@components/HomeHeader';
import RequestRecipient from '@components/RequestRecipient';

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
    label: 'Transcript Notarization',
    value: '8',
  },
  {
    label: 'Real-estate/mortgage',
    value: '9',
  },
  {
    label: 'Contestation',
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
interface uploadType {
  uri: string;
  name: string;
  type: 'image' | 'video' | undefined | string;
}
const CreateARequest = () => {
  const navigation = useNavigation<SignUpStackScreenProps<'Step4'>['navigation']>();
  const [documents, setDocuments] = useState<uploadType[]>(new Array());
  const [progress, setProgress] = useState(0.2);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('Reason');
  const [previousDisabled, setPreviousDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const sendData = async () => {
    setLoading(true);
    const token = await getToken();
    axios
      .post('https://docudash.net/api/create-request', {
        industry_id: 'industryID',
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
    <SafeAreaView style={tw`flex-1 bg-[${colors.white}]`}>
      <HomeHeader heading={'Create a Request'} />
      <View style={tw`flex gap-3 justify-center items-center`}>
        <Image
          style={tw`w-70 h-30 self-center`}
          resizeMode="contain"
          source={require('@assets/logo.png')}
        />
        <Text variant="titleLarge">Create A Request</Text>
        <Text variant="titleMedium">{value}</Text>
      </View>
      <ScrollView>
        <View style={tw`flex-1 gap-2`}>
          {value === 'Reason' && <RequestReason />}
          {value === 'Recipient' && <RequestRecipient />}

          {value === 'Documents' && (
            <UploadView documents={documents} setDocuments={setDocuments} />
          )}
          {value === 'Message' && <RequestMessage />}
        </View>
      </ScrollView>
      <ProgressBar progress={progress}></ProgressBar>
      <View style={tw`flex-row gap-4 my-4 justify-center`}>
        <Button
          mode="contained"
          disabled={previousDisabled}
          onPress={() => {
            if (value === 'Reason') {
              setProgress(0.2);
            } else if (value === 'Recipient') {
              setPreviousDisabled(true);
              setNextDisabled(false);
              setProgress(0.2);
              setValue('Reason');
            } else if (value === 'Documents') {
              setProgress(0.4);
              setValue('Recipient');
              setNextDisabled(false);
            } else if (value === 'Message') {
              setProgress(0.6);
              setValue('Documents');
              setNextDisabled(false);
            } else {
              setValue('Message');
              // console.log(input);
              navigation.goBack();
            }
          }}
        >
          Previous
        </Button>

        {nextDisabled ? (
          <Button mode="contained" onPress={sendData} loading={loading}>
            Create Request
          </Button>
        ) : (
          <Button
            mode="contained"
            disabled={nextDisabled}
            onPress={() => {
              if (value === 'Reason') {
                setProgress(0.4);
                setValue('Recipient');
                setNextDisabled(false);
                setPreviousDisabled(false);
              } else if (value === 'Recipient') {
                setProgress(0.6);
                setValue('Documents');
                setNextDisabled(false);
                setPreviousDisabled(false);
              } else if (value === 'Documents') {
                setProgress(0.8);
                setValue('Message');
                setNextDisabled(true);
                setPreviousDisabled(false);
              } else if (value === 'Message') {
                setProgress(0.8);
              } else {
                // console.log(input);
                navigation.goBack();
              }
            }}
          >
            Next
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateARequest;

const styles = StyleSheet.create({
  heading: tw`text-4 font-bold`,
});

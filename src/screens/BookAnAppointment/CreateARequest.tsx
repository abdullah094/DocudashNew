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
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import CalendarPicker from 'react-native-calendar-picker';

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
const CreateARequest = () => {
  const navigation = useNavigation<SignUpStackScreenProps<'Step4'>['navigation']>();
  const route = useRoute<SignUpStackScreenProps<'Step4'>['route']>();
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<{
    selectedStartDate: Date;
    selectedEndDate: Date;
  }>({
    selectedStartDate: null,
    selectedEndDate: null,
  });
  const [password, setPassword] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [industryID, setIndustryID] = useState<string>('');
  const [timeVal, setTimeVal] = useState<string>('');
  const [reasonID, setReasonID] = useState<string>('');
  const [showDropDownIndustry, setShowDropDownIndustry] = useState(false);
  const [timeDropdown, setTimeDropdown] = useState(false);
  const dispatch = useDispatch();
  const [fromTo, setFromTo] = useState<String | undefined>();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [value, setValue] = React.useState('Reason');

  const minDate = new Date(); // Today
  // const maxDate = new Date(2017, 6, 3);
  const startDate = state.selectedStartDate ? state.selectedStartDate.toString() : '';
  const endDate = state.selectedEndDate ? state.selectedEndDate.toString() : '';

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
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setState((prev) => ({ ...prev, selectedEndDate: date }));
      closeMenu();
    } else {
      setState((prev) => ({
        ...prev,
        selectedStartDate: date,
        selectedEndDate: null,
      }));
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-[${colors.white}]`}>
      <ScrollView contentContainerStyle={tw`flex-1`}>
        <View style={tw`flex gap-3 justify-center items-center`}>
          <Image
            style={tw`w-70 h-30 self-center`}
            resizeMode="contain"
            source={require('@assets/logo.png')}
          />
          <Text variant="titleLarge">Create A Request</Text>
          <Text variant="titleMedium">{value}</Text>
        </View>

        <View style={tw`flex-1 gap-2`}>
          {value === 'Reason' && (
            <>
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
              <Text style={styles.heading}>Availability Date</Text>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchorPosition="bottom"
                anchor={
                  <Button onPress={openMenu}>
                    START DATE:{startDate} END DATE:{endDate}
                  </Button>
                }
              >
                <CalendarPicker
                  startFromMonday={true}
                  allowRangeSelection={true}
                  minDate={minDate}
                  // maxDate={maxDate}
                  todayBackgroundColor="#f2e6ff"
                  selectedDayColor="#7300e6"
                  selectedDayTextColor="#FFFFFF"
                  onDateChange={onDateChange}
                />
              </Menu>

              <View style={tw`border-2 border-[${colors.green}] rounded-3xl overflow-hidden my-2`}>
                <DropDown
                  mode={'flat'}
                  placeholder="Select Your Time ?"
                  visible={timeDropdown}
                  inputProps={{ backgroundColor: 'white', width: '100%' }}
                  showDropDown={() => setTimeDropdown(true)}
                  onDismiss={() => setTimeDropdown(false)}
                  value={timeVal}
                  setValue={setTimeVal}
                  list={time}
                />
              </View>
            </>
          )}
        </View>
        <ProgressBar progress={progress}></ProgressBar>
        <View style={tw`flex-row gap-4 justify-center`}>
          <Button
            loading={false}
            onPress={() => {
              if (value === 'Reason') {
                setProgress(0.2);
              } else if (value === 'Recipient') {
                setProgress(0.4);
                setValue('Reason');
              } else if (value === 'Documents') {
                setProgress(0.6);
                setValue('Recipient');
              } else if (value === 'Message') {
                setProgress(0.8);
                setValue('Documents');
              } else {
                setValue('Message');
                // console.log(input);
                navigation.goBack();
              }
            }}
          >
            Previous
          </Button>
          <GreenButton
            loading={loading}
            text={'Next'}
            onPress={() => {
              if (value === 'Reason') {
                setProgress(0.2);
                setValue('Recipient');
              } else if (value === 'Recipient') {
                setProgress(0.4);
                setValue('Documents');
              } else if (value === 'Documents') {
                setProgress(0.6);
                setValue('Message');
              } else if (value === 'Message') {
                setProgress(0.8);
              } else {
                // console.log(input);
                navigation.goBack();
              }
            }}
            styles={{}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateARequest;

const styles = StyleSheet.create({
  heading: tw`text-4 font-bold`,
});

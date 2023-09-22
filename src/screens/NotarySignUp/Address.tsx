import GreenButton from '@components/GreenButton';
import Input from '@components/Input';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NotraySignUpAPI, SignUpAPI, SignUpStackScreenProps } from '@type/index';
import { getToken, storeData } from '@utils/AsyncFunc';
import { colors } from '@utils/Colors';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Chip, Divider, Menu, Text } from 'react-native-paper';
import { NotaryResendCode } from 'src/types/NotrayResendCode';
import tw from 'twrnc';
import Icon from '@expo/vector-icons/AntDesign';

const Address = () => {
  const navigation = useNavigation<SignUpStackScreenProps<'Step2'>['navigation']>();
  const route = useRoute<SignUpStackScreenProps<'Step2'>['route']>();
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [countryValue, setCountryValue] = useState('Select country');
  const [showDropDownState, setShowDropDownState] = useState(false);
  const [stateValue, setStateValue] = useState('Select State');
  const [form, setForm] = useState({
    address1: '',
    address2: '',
    country: '',
    state: '',
  });
  const fetchData = async () => {
    setLoading(true);

    const token = await getToken();
    axios
      .post('https://docudash.net/api/notary-sign-up-4/' + token, {
        address1: form.address1,
        address2: form.address2,
        country: form.country,
        state: form.state,
      })
      .then((response) => {
        const { success = true, data }: NotraySignUpAPI = response.data;
        console.log('optScreen-', response.data);

        if (success) {
          console.log(data.steps);

          setLoading(false),
            //@ts-ignore
            navigation.replace('NotaryLoginStackNavigator', {
              screen: ('Step' + data.steps) as any,
              params: {
                api: response.data.next,
              },
            }),
            storeData('Step' + data.steps);
        } else {
          Alert.alert('Failed', 'Wrong code Please try again or resend code'),
            setOtp(''),
            setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const closeMenu = () => {
    setShowDropDown(false);
  };
  const openMenu = () => {
    setShowDropDown(true);
  };
  const closeMenuState = () => {
    setShowDropDownState(false);
  };
  const openMenuState = () => {
    setShowDropDownState(true);
  };

  return (
    <ScrollView contentContainerStyle={tw`h-full bg-white`}>
      <View style={tw`flex-1 gap-2 justify-center px-10`}>
        <KeyboardAvoidingView keyboardVerticalOffset={150} behavior={'position'}>
          <View style={tw`absolute top--10 left-5`}>
            <Chip>
              <Text variant="labelLarge">{`5/6`}</Text>
            </Chip>
          </View>
          <Image
            style={tw`w-65 self-center`}
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
            Address
          </Text>
          <Text
            style={[
              { fontFamily: 'nunito-SemiBold' },
              tw`text-center text-[${colors.blue}] text-base`,
            ]}
          >
            Enter your address below
          </Text>

          <Input
            state={form.address1}
            setState={(text) => setForm((prev) => ({ ...prev, address1: text }))}
            placeholder={'House Number'}
            style={tw`text-center`}
            keyboardType={'ascii-capable'}
          />

          <Input
            state={form.address2}
            setState={(text) => setForm((prev) => ({ ...prev, address2: text }))}
            placeholder={'Street'}
            style={tw`text-center`}
            keyboardType={'ascii-capable'}
          />
          <Menu
            onDismiss={closeMenu}
            anchorPosition="bottom"
            anchor={
              <Pressable onPress={openMenu} style={styles.drop_down_style}>
                <Text style={tw`self-center`}>{form.country}</Text>
                <View style={tw`absolute right-10`}>
                  <Icon name="down" size={15} color={'black'} />
                </View>
              </Pressable>
            }
            visible={showDropDown}
          >
            <Menu.Item
              style={tw`w-full`}
              title="--"
              onPress={() => {
                setForm((prev) => ({ ...prev, country: '--' }));
                closeMenu();
              }}
            />
            <Divider />
            <Menu.Item
              style={tw`w-full`}
              title="United States"
              onPress={() => {
                setForm((prev) => ({ ...prev, country: 'United States' }));
                closeMenu();
              }}
            />
          </Menu>
          {/* State */}
          <Menu
            onDismiss={closeMenuState}
            anchorPosition="bottom"
            anchor={
              <Pressable onPress={openMenuState} style={styles.drop_down_style}>
                <Text>{form.state}</Text>
                <View style={tw`absolute right-10`}>
                  <Icon name="down" size={15} color={'black'} />
                </View>
              </Pressable>
            }
            visible={showDropDownState}
          >
            <Menu.Item
              style={tw`w-full`}
              title="--"
              onPress={() => {
                setForm((prev) => ({ ...prev, state: '--' }));
                closeMenuState();
              }}
            />
            <Divider />
            <Menu.Item
              style={tw`w-full`}
              title="Texas"
              onPress={() => {
                setForm((prev) => ({ ...prev, state: 'Texas' }));
                closeMenuState();
              }}
            />
          </Menu>

          <GreenButton loading={loading} text={'Next'} onPress={fetchData} />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({
  drop_down_style: tw`border-2 h-14 justify-center items-center border-gray-400 rounded-full mt-3`,
});

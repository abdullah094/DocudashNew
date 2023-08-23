import { SafeAreaView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import {
  TextInput,
  Text,
  IconButton,
  Button,
  Modal,
  useTheme,
  HelperText,
  Menu,
  Divider,
  Chip,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import COLORS from '@constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { RootStackParamList, RootStackScreenProps } from '@type/index';
const actionList = [
  {
    label: 'Needs to Sign',
    value: '1',
  },
  {
    label: 'In Person Signer',
    value: '2',
  },
  {
    label: 'Receives a Copy',
    value: '3',
  },
  {
    label: 'Needs to View',
    value: '4',
  },
];

export default function AddRecipient() {
  const navigation = useNavigation<RootStackScreenProps<'AddRecipient'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'AddRecipient'>['route']>();

  const Recipients = route.params?.Recipients;
  const Recipient = route.params?.Recipient;
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [recipient, setRecipient] = useState({
    recName: '',
    recEmail: '',
    sign_type: '1',
    hostName: '',
    hostEmail: '',
    access_code: '',
    private_message: '',
    recipients_update_id: '0',
    showDropDown: false,
    visible: false,
    showAccessCode: false,
    showPrivateMessage: false,
  });

  useEffect(() => {
    if (Recipient) {
      setRecipient(Recipient);
    }
  }, []);

  const addNewRecipient = () => {
    if (Recipient) {
      var EditedRecipients = Recipients;
      EditedRecipients[Recipients.indexOf(Recipient)] = recipient;
      console.log('EditedRecipients', EditedRecipients);
      navigation.navigate('Edit', { Recipients: EditedRecipients });
    } else navigation.navigate('Edit', { Recipients: [...Recipients, recipient] });
  };

  return (
    <SafeAreaView style={tw`h-full bg-[${COLORS.white}]`}>
      <View style={tw`p-5 flex-row justify-between items-center`}>
        <Icon name="arrow-left" size={28} onPress={() => navigation.goBack()} />
        <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>
          {Recipient ? 'EDIT RECIPIENT' : 'ADD RECIPIENT'}
        </Text>
        <View></View>
        {/* <Menu
          anchorPosition="bottom"
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon="back"></IconButton>}
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Browser', {
                url: 'https://docudash.net/pricing',
                heading: 'PRICING',
              });
            }}
            title="Get Started"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Browser', {
                url: 'https://docudash.net/contact-us',
                heading: 'SUPPORT',
              });
            }}
            title="Support"
          />
          <Divider />
          <Menu.Item onPress={() => {}} title="Community" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Trust center" />
          <Divider />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Browser', {
                url: 'https://docudash.net/contact-us',
                heading: 'CONTACT US',
              });
            }}
            title="Contact Us"
          />
        </Menu> */}
      </View>

      <View style={tw`flex-1 gap-2 m-2 p-2  `}>
        <DropDown
          label={'Actions'}
          mode={'outlined'}
          visible={recipient.showDropDown}
          showDropDown={() => setRecipient((prev) => ({ ...prev, showDropDown: true }))}
          onDismiss={() => setRecipient((prev) => ({ ...prev, showDropDown: false }))}
          value={String(recipient.sign_type)}
          setValue={(value) => {
            setRecipient((prev) => ({ ...prev, sign_type: value }));
          }}
          list={actionList}
        />
        <TextInput
          mode="outlined"
          label="Recipient Name"
          value={recipient.recName}
          onChangeText={(text) => {
            setRecipient((prev) => ({ ...prev, recName: text }));
          }}
        />
        {recipient.sign_type == '2' ? (
          <>
            <TextInput
              mode="outlined"
              label="Host Name"
              value={recipient.hostName}
              onChangeText={(text) => {
                setRecipient((prev) => ({ ...prev, hostName: text }));
              }}
            />
            <TextInput
              mode="outlined"
              label="Host Email Address"
              value={recipient.hostEmail}
              onChangeText={(text) => {
                setRecipient((prev) => ({ ...prev, hostEmail: text }));
              }}
            />
          </>
        ) : (
          <TextInput
            mode="outlined"
            label="Recipient Email Address"
            value={recipient.recEmail}
            onChangeText={(text) => {
              setRecipient((prev) => ({ ...prev, recEmail: text }));
            }}
          />
        )}

        <Menu
          visible={recipient.visible}
          anchorPosition="bottom"
          onDismiss={() => {
            setRecipient((prev) => ({ ...prev, visible: false }));
          }}
          anchor={
            <Chip
              icon="chevron-down"
              mode="outlined"
              style={tw`w-30`}
              onPress={() => {
                setRecipient((prev) => ({ ...prev, visible: true }));
              }}
            >
              Customize
            </Chip>
          }
        >
          <Menu.Item
            onPress={() => {
              setRecipient((prev) => ({
                ...prev,
                visible: false,
                showAccessCode: !prev.showAccessCode,
              }));
            }}
            style={tw`h-16`}
            title={
              <View>
                <Text variant="titleSmall">Enter Access Code</Text>
                <Text variant="bodySmall">Enter a code that only you and this recipient know.</Text>
              </View>
            }
          ></Menu.Item>
          <Divider />
          <Menu.Item
            onPress={() => {
              setRecipient((prev) => ({
                ...prev,
                visible: false,
                showPrivateMessage: !prev.showPrivateMessage,
              }));
            }}
            style={tw`h-16`}
            title={
              <View>
                <Text variant="titleSmall">Add private message</Text>
                <Text variant="bodySmall">Include a personal note with this recipient.</Text>
              </View>
            }
          />
        </Menu>
        {recipient.showAccessCode && (
          // style={tw`flex-1 p-2 border border-gray-500 my-2 rounded-lg`}
          <View>
            {/* <Text variant="headlineSmall">Enter Access Code</Text> */}

            <TextInput
              mode="outlined"
              label="Access Code"
              value={recipient.access_code}
              onChangeText={(text) => {
                setRecipient((prev) => ({ ...prev, access_code: text }));
              }}
            />
            <HelperText type="info">
              Codes are not case-sensitive. You must provide this code to the signer. This code is
              available for you to review on the Envelope Details page.
            </HelperText>
          </View>
        )}
        {recipient.showPrivateMessage && (
          <View>
            <TextInput
              mode="outlined"
              label="Private Message"
              value={recipient.private_message}
              multiline
              numberOfLines={4}
              onChangeText={(text) => {
                setRecipient((prev) => ({ ...prev, private_message: text }));
              }}
            />
            <HelperText type={1000 - recipient.private_message.length >= 0 ? 'info' : 'error'}>
              Characters remaining: {1000 - recipient.private_message.length}
            </HelperText>
          </View>
        )}
      </View>
      <View style={tw`flex-row mx-2 gap-2`}>
        <View style={tw`flex-1`}></View>
        <Button mode="contained-tonal" onPress={() => navigation.goBack()}>
          Close
        </Button>
        <Button mode="contained" onPress={addNewRecipient}>
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
}

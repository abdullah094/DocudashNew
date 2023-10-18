import RecipientList from '@components/RecipientList';
import UploadView from '@components/UploadView';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { selectAccessToken } from '@stores/Slices';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  GenerateSignature,
  GenerateSignatureDetailsImage,
  RootStackScreenProps,
  UploadDocumentAPI,
} from '@type/index';
import { colors } from '@utils/Colors';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import mime from 'mime';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Appbar,
  Badge,
  Button,
  Chip,
  Divider,
  HelperText,
  IconButton,
  List,
  Menu,
  Text,
  TextInput,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { Wizard } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import COLORS from '@constants/colors';
import Loader from '@components/Loader';

interface uploadType {
  uri: string;
  name: string;
  type: 'image' | 'video' | undefined | string;
}
const actionList = [
  {
    label: 'Every Day',
    value: '1',
  },
  {
    label: 'Every 2 Days',
    value: '2',
  },
];
interface State {
  activeIndex: number;
  completedStepIndex?: number;
  allTypesIndex: number;
  selectedFlavor: string;
  customerName?: string;
  toastMessage?: string;
}

const Edit = () => {
  const flavors = ['Chocolate', 'Vanilla'];
  const initialFlavor = flavors[0];
  const accessToken = useSelector(selectAccessToken);
  const navigation = useNavigation<RootStackScreenProps<'Edit'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Edit'>['route']>();
  const [state, setState] = useState<State>({
    activeIndex: 0,
    completedStepIndex: undefined,
    allTypesIndex: 0,
    selectedFlavor: initialFlavor,
    customerName: undefined,
    toastMessage: undefined,
  });
  const [data, setData] = useState([]);

  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [frequencyOfReminder, setFrequencyOfReminder] = useState(1);
  const [forVisible, setForVisible] = useState(false);
  const [documents, setDocuments] = useState<uploadType[]>(new Array());
  const [loading, setLoading] = useState(false);
  const [generateSignature, setGenerateSignature] = useState<GenerateSignature>();
  const [generateSignatureDetailsImages, setGenerateSignatureDetailsImages] = useState<
    GenerateSignatureDetailsImage[]
  >([]);

  const envelope = route.params?.Envelope;
  const files = route.params?.files;
  const Recipients = route.params?.Recipients;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (files) {
      setDocuments(files);
    }
    if (Recipients) {
      setData(Recipients);
    }
    console.log('found', generateSignature);
    if (!generateSignature || generateSignature == undefined) {
      setLoading(true);
      if (envelope) {
        axios
          .get(
            'https://docudash.net/api/generate-signature/upload-document/' +
              envelope.uniqid +
              '/' +
              envelope.id,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            const data: UploadDocumentAPI = response.data;
            setLoading(false);
            console.log('', response.data);
            if (data.generateSignatureDetails.length > 0) {
              const fixData = data.generateSignatureDetails.map((x) => {
                return {
                  ...x,
                  recipients_update_id: x.id,
                  showDropDown: false,
                  visible: false,
                  showAccessCode: false,
                  showPrivateMessage: false,
                };
              });
              setEmailMessage(fixData[0].emailMessage);
              setEmailSubject(fixData[0].emailSubject);
              // @ts-ignore
              setData(fixData);
            }
            const generate: GenerateSignature = {
              signature_id: data.signature_id,
              uniqid: data.uniqid,
            };
            setGenerateSignature(generate);
            if (data.generateSignatureDetailsImages.length > 0) {
              setGenerateSignatureDetailsImages(data.generateSignatureDetailsImages);
            }

            console.log('getting already Existing envelope', data);
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        const url = 'https://docudash.net/api/generate-signature/create';
        axios
          .post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            const data: GenerateSignature = response.data;
            setLoading(false);

            setGenerateSignature(data);
            console.log('Data----', data);
          })
          .catch((error) => {
            setLoading(false);
            console.log('Error----', error);
          });
      }
    }
  }, [route]);

  // useEffect(() => {
  //   navigation.addListener('beforeRemove', (e) => {
  //     if (e.data.action.type != 'GO_BACK') {
  //       // If we don't have unsaved changes, then we don't need to do anything
  //       return;
  //     }

  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();

  //     // Prompt the user before leaving the screen
  //     Alert.alert(
  //       'Discard changes?',
  //       'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //       [
  //         { text: "Don't leave", style: 'cancel', onPress: () => {} },
  //         {
  //           text: 'Discard',
  //           style: 'destructive',
  //           // If the user confirmed, then we dispatch the action we blocked earlier
  //           // This will continue the action that had triggered the removal of the screen
  //           onPress: () => {
  //             deleteDraft(e);
  //           },
  //         },
  //       ]
  //     );
  //   });
  // }, [navigation]);

  const deleteDraft = () => {
    // Prompt the user before leaving the screen
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => {
            const url = 'https://docudash.net/api/generate-signature/deleteDraftEmail';
            axios
              .post(
                url,
                { id: generateSignature.signature_id },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => {
                const { status, message }: { status: boolean; message: string } = response.data;
                console.log(response.data);
                if (status) navigation.navigate('Home');
                else {
                  alert(message);
                }
              })
              .catch((error) => {
                navigation.navigate('Home');
                console.log('Error----', error);
              });
          },
        },
      ]
    );
    if (generateSignature == undefined) return;
  };

  const save = () => {
    if (!generateSignature) return;
    if (emailSubject == '') {
      Alert.alert('Please enter email subject');
      return;
    }
    if (emailMessage == '') {
      Alert.alert('Please enter email message');
      return;
    }
    setLoading(true);
    let formData = new FormData();
    formData.append('uniqid', generateSignature.uniqid);
    formData.append('signature_id', generateSignature.signature_id);
    formData.append('expirationDays', 10);
    formData.append('number_of_expire_day_alert', 2);

    data.forEach((item, index) => {
      {
        formData.append('recipients_update_id[' + index + ']', item.recipients_update_id);
        formData.append('recName[' + index + ']', item.recName);
        formData.append('recEmail[' + index + ']', item.recEmail);
        formData.append('sign_type[' + index + ']', item.sign_type);
        formData.append('hostName[' + index + ']', item.hostName);
        formData.append('hostEmail[' + index + ']', item.hostEmail);
        formData.append('access_code[' + index + ']', item.access_code);
        formData.append('private_message[' + index + ']', item.private_message);
        formData.append('signingOrderInput[' + index + ']', item.id);
      }
    });
    formData.append('emailSubject', emailSubject);
    formData.append('emailMessage', emailMessage);
    formData.append('frequency_of_reminders', frequencyOfReminder);

    [...documents].forEach((image, index) => {
      formData.append('photosID[' + index + ']', '0');
      formData.append('photos[]', image, `image${index + 1}.png`);
    });
    let headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };
    console.log('formData', JSON.stringify(formData));
    axios
      .post('https://docudash.net/api/generate-signature/upload-document', formData, { headers })
      .then((response) => {
        setLoading(false);
        const {
          status,
          message,
        }: {
          status: boolean;
          message: {
            emailSubject: string[];
            emailMessage: string[];
            'recName.0': string[];
            'photos.0': string[];
          };
        } = response.data;
        if (status) {
          navigation.replace('DocumentEditor', {
            Envelope: generateSignature,
          });
        } else {
          for (const [key, value] of Object.entries(message)) {
            alert(value);
          }
          console.log(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('error', error);
      });
  };

  const onActiveIndexChanged = (activeIndex: number) => {
    setState((prev) => ({ ...prev, activeIndex }));
  };

  const getStepState = (index: number) => {
    const { activeIndex, completedStepIndex } = state;
    let currentState = Wizard.States.DISABLED;
    if (completedStepIndex && completedStepIndex > index - 1) {
      currentState = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      currentState = Wizard.States.ENABLED;
    }

    return state;
  };
  const renderCurrentStep = () => {
    const { activeIndex } = state;

    switch (activeIndex) {
      case 0:
      default:
        return renderAddRecipient();
      case 1:
        return renderAddMessage();
      case 2:
        return renderAddDocument();
    }
  };
  const resetThis = () => {
    const { customerName, selectedFlavor } = state;

    setState((prev) => ({
      ...prev,
      activeIndex: 0,
      completedStepIndex: undefined,
      selectedFlavor: initialFlavor,
      customerName: undefined,
      toastMessage: `${customerName}, you bought some ${selectedFlavor.toLowerCase()}`,
    }));
  };
  const goToPrevStep = () => {
    const { activeIndex: prevActiveIndex } = state;
    const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

    setState((prev) => ({ ...prev, activeIndex }));
  };
  const renderPrevButton = () => {
    return (
      <Button mode="outlined" style={tw`w-30`} icon="arrow-left" onPress={goToPrevStep}>
        Back
      </Button>
    );
  };
  const goToNextStep = () => {
    const { activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex } = state;
    const reset = prevActiveIndex === 2;
    if (reset) {
      resetThis();
      return;
    }

    const activeIndex = prevActiveIndex + 1;
    let completedStepIndex: number | undefined = prevCompletedStepIndex;
    if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
      completedStepIndex = prevActiveIndex;
    }

    if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
      setState((prev) => ({ ...prev, activeIndex, completedStepIndex }));
    }
  };

  const renderNextButton = (disabled?: boolean) => {
    const { activeIndex } = state;
    const label = activeIndex === 2 ? 'Done & Reset' : 'Next';

    return (
      <Button
        style={tw`w-30`}
        contentStyle={tw`flex-row-reverse`}
        mode="outlined"
        icon="arrow-right"
        onPress={goToNextStep}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  };
  const renderAddRecipient = () => (
    <>
      <RecipientList data={data} setData={setData} />
      <View style={tw`flex-row items-center gap-2 px-4 pb-2`}>
        <Text variant="labelLarge">Frequency of reminders :</Text>
        <Menu
          visible={forVisible}
          // anchorPosition="top"
          onDismiss={() => setForVisible(false)}
          anchor={
            <Chip
              icon="chevron-down"
              mode="outlined"
              style={tw` p-1`}
              onPress={() => {
                setForVisible(true);
              }}
            >
              {actionList[frequencyOfReminder - 1]?.label}
            </Chip>
          }
        >
          <Menu.Item
            onPress={() => {
              setFrequencyOfReminder(1);
              setForVisible(false);
            }}
            title="Every Day"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setFrequencyOfReminder(2);
              setForVisible(false);
            }}
            title="Every 2 Days"
          />
        </Menu>
      </View>
      {/* <DropDown
        label={'Frequency Of Reminder'}
        mode={'outlined'}
        visible={forVisible}
        showDropDown={() => setForVisible(true)}
        onDismiss={() => setForVisible(false)}
        value={String(frequencyOfReminder)}
        setValue={(value) => {
          setFrequencyOfReminder(value);
        }}
        list={actionList}
      /> */}
      <View style={tw`gap-2 justify-end flex-row mx-2`}>{renderNextButton()}</View>
    </>
  );

  const renderAddMessage = () => (
    <>
      <View style={tw`flex-1 gap-2 p-2 m-2 `}>
        <Text variant="headlineSmall">Add Message</Text>
        <View>
          <TextInput
            mode="outlined"
            label="Email Subject"
            value={emailSubject}
            onChangeText={(text) => setEmailSubject(text)}
          />
          <HelperText type={80 - emailSubject.length >= 0 ? 'info' : 'error'}>
            Characters remaining: {80 - emailSubject.length}
          </HelperText>
        </View>
        <View>
          <TextInput
            mode="outlined"
            label="Email Message"
            value={emailMessage}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setEmailMessage(text)}
          />
          <HelperText type={1000 - emailMessage.length >= 0 ? 'info' : 'error'}>
            Characters remaining: {1000 - emailMessage.length}
          </HelperText>
        </View>
      </View>
      <View style={tw` gap-2 justify-end flex-row mx-2`}>
        {renderPrevButton()}
        {renderNextButton()}
      </View>
    </>
  );
  const renderAddDocument = () => (
    <>
      <View style={tw`flex-1 gap-2 p-2  m-2 `}>
        <Text variant="headlineSmall">Add Documents</Text>
        <View style={tw`bg-white `}>
          <UploadView documents={documents} setDocuments={setDocuments} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={generateSignatureDetailsImages}
            renderItem={({ item }) => {
              let imageUrl = '';
              if (item.image?.includes('pdf')) {
                item.image.split('.')[0] + '-1.jpg';
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/converted/' +
                  item.image.split('.')[0] +
                  '-1.jpg';
              } else {
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/' + item.image;
              }
              return (
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={tw`h-20 w-20 m-2 rounded-lg`}
                />
              );
            }}
          />
        </View>
      </View>
      <View style={tw`gap-2 justify-end flex-row mx-2`}>
        {renderPrevButton()}
        <Button
          loading={loading}
          style={tw`w-30`}
          contentStyle={tw`flex-row-reverse`}
          mode="outlined"
          icon="arrow-right"
          onPress={save}
        >
          Create
        </Button>
      </View>
    </>
  );
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const voidEnvelope = () => {
    if (generateSignature == undefined) return;

    const url = 'https://docudash.net/api/generate-signature/deleteDraftEmail';
    axios
      .post(
        url,
        { id: generateSignature.signature_id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const { status, message }: { status: boolean; message: string } = response.data;
        console.log(response.data);
        if (status) navigation.navigate('Home');
        else {
          alert(message);
        }
      })
      .catch((error) => {
        console.log('Error----', error);
      });
  };
  if (loading) return <Loader />;

  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`flex-row p-5 justify-between items-center`}>
        <Icon name="arrow-left" size={28} onPress={() => deleteDraft()} />
        <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>
          {envelope ? 'Editing Envelope' : 'Creating New Envelope'}
        </Text>
        <Menu
          anchorPosition="bottom"
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              voidEnvelope();
            }}
            title="Delete Envelope"
          />
        </Menu>
      </View>
      <Wizard activeIndex={state.activeIndex} onActiveIndexChanged={onActiveIndexChanged}>
        <Wizard.Step
          state={getStepState(0)}
          labelStyle={tw`text-green-600`}
          label={'Add Recipient'}
        />
        <Wizard.Step
          labelStyle={tw`text-green-600`}
          state={getStepState(1)}
          label={'Add Message'}
        />
        <Wizard.Step
          labelStyle={tw`text-green-600`}
          state={getStepState(2)}
          label={'Add Document'}
        />
      </Wizard>
      {renderCurrentStep()}
      {/* <View style={tw`h-15 bg-gray-200  flex-row justify-between items-center px-10`}>
        <Text style={tw`text-4 font-semibold`}>Needs to sign</Text>
        <Button mode="outlined">hello</Button>
      </View> */}
    </SafeAreaView>
  );
};

export default Edit;

const styles = StyleSheet.create({});

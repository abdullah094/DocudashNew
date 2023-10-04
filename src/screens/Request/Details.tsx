global.Buffer = global.Buffer || require('buffer').Buffer;
import Loader from '@components/Loader';
import SigningOrderModal from '@components/SigningOrderModal';
import COLORS from '@constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectAccessToken, selectProfileData } from '@stores/Slices';
import {
  DraggedElArr,
  Envelope,
  GenerateSignature,
  HtmlEditorAPI,
  RootStackScreenProps,
  ViewDocument,
} from '@type/index';
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Divider, IconButton, Menu, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import VoidEnvelopeModel from '@components/VoidEnvelopeModel';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import {
  NotaryRequestsDetail,
  NotaryRequestsDetailsDocument,
  RequestDetailsPage,
} from 'src/types/RequestDetails';
import { colors } from '@utils/Colors';

interface IButton {
  text: string;
  onPress: () => void;
  pressed: boolean;
}

const Details = () => {
  const accessToken = useSelector(selectAccessToken);
  const navigation = useNavigation<RootStackScreenProps<'RequestDetails'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'RequestDetails'>['route']>();
  const id: number = route.params?.id;
  const accessCodeInputRef = useRef(null);

  const [data, setData] = useState<ViewDocument>();
  const [images, setImages] = useState<string[]>();
  const [dataLoader, setDataLoader] = useState(true);
  const [needToSignVisible, setNeedToSignVisible] = useState(false);
  const [accessCodeModal, setAccessCodeModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessCodeText, setAccessCodeText] = useState('');
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const [draggedElArr, setDraggedElArr] = useState<DraggedElArr>({
    signature: [],
    initial: [],
    stamp: [],
    date: [],
    name: [],
    email: [],
    company: [],
    title: [],
  });
  const closeMenu = () => setVisible(false);
  const user = useSelector(selectProfileData);
  const [visibleMore, setVisibleMore] = React.useState(false);
  const [details, setDetails] = useState<NotaryRequestsDetail[]>();
  const [visibleMoreHeader, setVisibleMoreHeader] = React.useState(false);
  const [incrorrectCode, setIncrorrectCode] = useState(false);
  const [documentDetails, setDocumentDetails] = useState<NotaryRequestsDetailsDocument[]>([]);
  const openMenuMoreHeader = () => setVisibleMoreHeader(true);
  const closeMenuMoreHeader = () => setVisibleMoreHeader(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [denyLoading, setDenyLoading] = useState(false);

  const Accept = () => {
    setAcceptLoading(true);
    axios
      .post(
        'https://docudash.net/api/notary/ApproveRequest',
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAcceptLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        setAcceptLoading(false);
      });
  };
  const Deny = () => {
    setDenyLoading(true);
    axios
      .post(
        'https://docudash.net/api/notary/DenyRequest',
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setDenyLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        setDenyLoading(false);
      });
  };

  const fetchData = () => {
    const url = 'https://docudash.net/api/notary/request-detail/';

    axios
      .get(url + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const {
          status,
          message,
          NotaryRequestsDetails,
          NotaryRequestsDetailsDocuments,
        }: RequestDetailsPage = response.data;
        setDetails(NotaryRequestsDetails);
        setDocumentDetails(NotaryRequestsDetailsDocuments);
      })
      .catch((error) => {
        console.log('Error----', error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Modal visible={accessCodeModal} transparent>
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`border-2 p-5 gap-4 bg-white rounded-xl`}>
            <Text style={tw`text-4 font-bold `}>Enter Access Code</Text>
            {incrorrectCode && (
              <Text style={tw`text-red-500`}>Incorrect code. Please try again</Text>
            )}
            <TextInput
              ref={accessCodeInputRef}
              editable={true}
              style={tw`w-60`}
              mode="outlined"
              value={accessCode}
              onChangeText={(text) => setAccessCode(text)}
            />
            <View style={tw`flex-row justify-center gap-2`}>
              <Button
                mode="outlined"
                onPress={() => {
                  setAccessCodeModal(false);
                  setTimeout(() => {
                    setAccessCode('');
                    setTimeout(() => {
                      setIncrorrectCode(false);
                    }, 100);
                  }, 100);
                }}
              >
                {' '}
                Cancel
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  if (accessCode == accessCodeText) {
                    setIncrorrectCode(false);
                    setTimeout(() => {
                      setAccessCodeModal(false);
                      setTimeout(() => {
                        setAccessCode('');
                      }, 100);
                    }, 100);
                    // navigation.navigate('DocumentViewer', { Envelope: generate });
                  } else {
                    setIncrorrectCode(true);
                    setTimeout(() => {
                      setAccessCode('');
                    }, 100);
                  }
                }}
              >
                {' '}
                View
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={tw`flex-0`}></SafeAreaView>
      <View style={styles.header}>
        <Icon name="arrow-left" size={28} onPress={() => navigation.goBack()} />
        <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>
          {data?.generateSignatureDetails[0]?.emailSubject}
        </Text>
        <Menu
          anchorPosition="bottom"
          visible={visibleMoreHeader}
          onDismiss={closeMenuMoreHeader}
          anchor={
            <IconButton icon="dots-vertical" onPress={(_) => openMenuMoreHeader()}></IconButton>
          }
        >
          {/* <VoidEnvelopeModel inbox={inbox} navigation={navigation} /> */}
          <Divider />
          {/* <Menu.Item onPress={DeleteEnvelope} title="Delete" /> */}
          <Divider />
          {/* <Menu.Item onPress={ResendEmail} title="Resend Email" /> */}
        </Menu>
      </View>
      <ScrollView>
        <View style={tw`p-4 gap-3 py-10 pt-3`}>
          <View style={tw`  gap-3`}>
            <Text style={styles.heading}>{'Notary Document (legal Document)'}</Text>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="information" onPress={openMenu} />}
            >
              <Menu.Item onPress={() => {}} title="Details" />
              <Menu.Item
                onPress={() => {}}
                title={
                  <View style={tw`gap-1`}>
                    <Text style={tw`font-bold text-black`}>Created At:{}</Text>
                    <Text style={tw`text-black`}>{data?.generateSignature.created_at}</Text>
                  </View>
                }
              />
              <Menu.Item
                onPress={() => {}}
                title={
                  <View style={tw`gap-1`}>
                    <Text style={tw`font-bold text-black`}>Modified At</Text>
                    <Text style={tw`text-black`}>{data?.generateSignature.updated_at}</Text>
                  </View>
                }
              />
              <Menu.Item
                onPress={() => {}}
                title={
                  <View style={tw`gap-1`}>
                    <Text style={tw`font-bold text-black`}>Owner</Text>
                    <Text style={tw`text-black`}>{data?.generateSignature.user.first_name}</Text>
                  </View>
                }
              />
            </Menu>
          </View>

          <View style={tw`mt-5 gap-1`}>
            <Text>
              Reason of the request:{' '}
              <Text style={tw`text-[#6FAC46]`}>{data?.generateSignatureDetails[0]?.uniqid}</Text>
            </Text>
            <Text>
              Availability Date:{' '}
              <Text style={tw`text-[#6FAC46]`}>
                {' '}
                {data?.generateSignatureDetails[0]?.user.first_name}{' '}
                {data?.generateSignatureDetails[0]?.user.last_name}
              </Text>
            </Text>
            <Text>
              Number of User To sign:{' '}
              <Text style={tw`text-[#6FAC46]`}>
                {new Date(data?.generateSignature.created_at).toUTCString()}
              </Text>
            </Text>
            <Text>
              Number of Pages Uploaded:{' '}
              <Text style={tw`text-[#6FAC46]`}>
                {new Date(data?.generateSignature.created_at).toUTCString()}
              </Text>
            </Text>
            <Text>
              Create Date:
              <Text style={tw`text-[#6FAC46]`}>
                {new Date(data?.generateSignature.created_at).toUTCString()}
              </Text>
            </Text>
          </View>

          {/* Buttons */}
          <View style={tw`flex-row items-center  gap-3 py-5`}>
            <View style={tw` items-center gap-5 py-2 justify-center`}>
              <Button
                mode="contained"
                loading={acceptLoading}
                disabled={acceptLoading}
                onPress={Accept}
              >
                Accept
              </Button>
            </View>

            <View style={tw`flex-row items-center gap-5 py-2 justify-center`}>
              <Button loading={denyLoading} disabled={denyLoading} onPress={Deny} mode="outlined">
                Deny
              </Button>
            </View>
          </View>
          <View style={tw`py-10 gap-4`}>
            <Text style={styles.heading}>Uploaded Documents</Text>
            <View>
              {documentDetails.map((e, i) => (
                <View style={tw` mt-2 border-2 border-[${colors.green}] rounded-lg p-3  gap-1`}>
                  <Text style={tw`text-black text-4 font-semibold`}>{e.document}</Text>
                  <Text style={tw`text-gray-400`}> {new Date(e?.created_at).toUTCString()}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={tw`py-5`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={styles.heading}>Recipients</Text>
            </View>
            {data?.generateSignatureDetails.map((item, index) => (
              <View id={String(index)} style={tw` mt-5 py-3 flex-row items-center  `}>
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text style={styles.h2} numberOfLines={2}>
                      {item.recName}
                    </Text>
                  </View>
                  <Text style={tw`font-thin text-black`}>{item.recEmail}</Text>
                  <Text style={tw` text-black`}>
                    Status: {item.complete_incomplete === 0 ? 'pending' : 'Completed'}
                  </Text>
                </View>
                <View style={tw`flex-row items-center flex-0.6 `}>
                  <Image style={tw`w-5 h-5 mx-2`} source={require('@assets/NeedToSign.png')} />
                  <View>
                    <Text style={tw`text-3 font-bold overflow-hidden w-full`}>
                      {item.sign_type == '1'
                        ? 'Need to Sign'
                        : item.sign_type == '2'
                        ? 'In Person Signer'
                        : item.sign_type === '3'
                        ? 'Receives a Copy'
                        : 'Needs to View'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={tw`py-2`}>
            <Text style={styles.heading}>Message</Text>
            <View style={tw`m-3 mt-5`}>
              <Text style={tw`font-thin`}>No message have been entered</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {data?.generateSignatureDetails
        .filter(
          (item) =>
            item.recEmail.toLowerCase() == user.email.toLowerCase() &&
            item.complete_incomplete === 0
        )
        .map((item) => (
          <View style={tw`h-15 bg-gray-200  flex-row justify-between items-center px-10`}>
            <Text style={tw`text-4 font-semibold`}>
              {item.sign_type == '1'
                ? 'Need to Sign'
                : item.sign_type == '2'
                ? 'In Person Signer'
                : item.sign_type === '3'
                ? 'Receives a Copy'
                : 'Needs to View'}
            </Text>
            <Button mode="outlined">{item.sign_type == '1' ? 'Sign' : 'View'}</Button>
          </View>
        ))}
      <SafeAreaView style={tw`flex-1 bg-gray-200`}></SafeAreaView>
    </Fragment>
  );
};

export default Details;

const styles = StyleSheet.create({
  heading: tw`font-bold text-5`,
  h2: tw`text-3 w-[50%]`,
  menu_block: tw`p-3 font-bold`,
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

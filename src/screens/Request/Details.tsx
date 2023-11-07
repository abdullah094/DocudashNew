global.Buffer = global.Buffer || require('buffer').Buffer;
import COLORS from '@constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectAccessToken, selectProfileData } from '@stores/Slices';
import { DraggedElArr, RootStackScreenProps, ViewDocument } from '@type/index';
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Divider, IconButton, Menu, TextInput, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import {
  NotaryRequests,
  NotaryRequestsDetail,
  NotaryRequestsDetailsDocument,
  RequestDetailsPage,
} from 'src/types/RequestDetails';
import { colors } from '@utils/Colors';
import { reasons } from '@utils/requestReason';
import { time } from '@utils/requestTime';
import { requestType } from '@utils/requestType';

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
  const [details, setDetails] = useState<NotaryRequests>();
  const [visibleMoreHeader, setVisibleMoreHeader] = React.useState(false);
  const [documentDetails, setDocumentDetails] = useState<NotaryRequestsDetailsDocument[]>([]);
  const openMenuMoreHeader = () => setVisibleMoreHeader(true);
  const closeMenuMoreHeader = () => setVisibleMoreHeader(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [denyLoading, setDenyLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [recipients, setRecipients] = useState<NotaryRequestsDetail[]>([]);

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
  const Done = () => {
    setDoneLoading(true);
    axios
      .post(
        'https://docudash.net/api/notary/DoneRequest',
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
        setDoneLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        setDoneLoading(false);
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
          NotaryRequests,
          NotaryRequestsDetails,
          NotaryRequestsDetailsDocuments,
        }: RequestDetailsPage = response.data;
        setDetails(NotaryRequests);
        setRecipients(NotaryRequestsDetails);
        setDocumentDetails(NotaryRequestsDetailsDocuments);
      })
      .catch((error) => {
        console.log('Error----', error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (details)
    return (
      <SafeAreaView style={tw`h-full`}>
        <View style={styles.header}>
          <Icon name="arrow-left" size={28} onPress={() => navigation.goBack()} />
          <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>
            {'Request Detail'}
          </Text>
          {user.user_type === 7 ? (
            <Menu
              anchorPosition="bottom"
              visible={visibleMoreHeader}
              onDismiss={closeMenuMoreHeader}
              anchor={
                <IconButton icon="dots-vertical" onPress={(_) => openMenuMoreHeader()}></IconButton>
              }
            >
              <Menu.Item onPress={Accept} title="Accept" />
              {/* <VoidEnvelopeModel inbox={inbox} navigation={navigation} /> */}
              <Divider />
              <Menu.Item onPress={Deny} title="Deny" />
              {/* <Menu.Item onPress={DeleteEnvelope} title="Delete" /> */}
              <Divider />
              <Menu.Item onPress={Done} title="Done" />
              <Divider />

              {/* <Menu.Item onPress={ResendEmail} title="Resend Email" /> */}
            </Menu>
          ) : (
            <View></View>
          )}
        </View>
        <ScrollView>
          <View style={tw`p-4 gap-3 py-10 pt-3`}>
            <View style={tw`  gap-3 flex-row items-center`}>
              <Text style={[styles.heading, { width: '80%' }]} numberOfLines={2}>
                {reasons.find((x) => x.value == details?.reasonOfRequest.toString())?.label}
              </Text>
              <Menu
                style={tw`w-70`}
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="information" onPress={openMenu} />}
              >
                <Menu.Item onPress={() => {}} title="Details" />
                <Menu.Item
                  onPress={() => {}}
                  title={
                    <Text style={tw`text-black`}>
                      <Text style={tw`font-bold text-black`}>Created At: </Text>
                      {new Date(details.created_at).toUTCString().slice(0, 17)}
                    </Text>
                  }
                />
                <Menu.Item
                  onPress={() => {}}
                  title={
                    <Text style={tw`text-black`}>
                      <Text style={tw`font-bold text-black`}>Modified At: </Text>
                      {new Date(details.updated_at).toUTCString().slice(0, 17)}
                    </Text>
                  }
                />
                <Menu.Item
                  onPress={() => {}}
                  title={
                    <Text style={tw`text-black`}>
                      <Text style={tw`font-bold text-black`}>User: </Text>
                      {details.individual_details.first_name}
                    </Text>
                  }
                />
                <Menu.Item
                  onPress={() => {}}
                  title={
                    <Text style={tw`text-black`}>
                      <Text style={tw`font-bold text-black`}>Notary: </Text>
                      {details.notary_details.first_name}
                    </Text>
                  }
                />
              </Menu>
            </View>

            <View style={tw`gap-2`}>
              <Text variant="labelLarge">
                Reason of the request:{' '}
                <Text style={tw`text-[#6FAC46]`}>
                  {reasons.find((x) => x.value == details.reasonOfRequest.toString())?.label}
                </Text>
              </Text>
              <Text variant="labelLarge">
                Availability Date: <Text style={tw`text-[#6FAC46]`}> {details.requestDate}</Text>
              </Text>
              <Text variant="labelLarge">
                Availability Time:{' '}
                <Text style={tw`text-[#6FAC46]`}>
                  {time.find((x) => x.value == details.requestTime.toString())?.label}
                </Text>
              </Text>
              <Text variant="labelLarge">
                Number of User To Sign:{' '}
                <Text style={tw`text-[#6FAC46]`}>{details.numOfRecipients}</Text>
              </Text>
              <Text variant="labelLarge">
                Number of Pages Uploaded:{' '}
                <Text style={tw`text-[#6FAC46]`}>{details.reasonOfRequest}</Text>
              </Text>
              <Text variant="labelLarge">
                Create Date:{' '}
                <Text style={tw`text-[#6FAC46]`}>
                  {new Date(details.created_at).toUTCString().slice(0, 17)}
                </Text>
              </Text>
              <Text variant="labelLarge">
                Create By:{' '}
                <Text style={tw`text-[#6FAC46]`}>{details.individual_details.first_name}</Text>
              </Text>
              <Text variant="labelLarge">
                Address:{' '}
                <Text style={tw`text-[#6FAC46]`}>
                  {details.requestLocation || 'NO ADDRESS AVAILABLE'}
                </Text>
              </Text>
            </View>

            {/* Buttons */}
            {user.user_type === 7 ? (
              <View style={tw`flex-row items-center  gap-3 py-5`}>
                {details.notary_request_status === 1 ? (
                  <>
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
                      <Button
                        loading={denyLoading}
                        disabled={denyLoading}
                        onPress={Deny}
                        mode="outlined"
                      >
                        Deny
                      </Button>
                    </View>
                  </>
                ) : (
                  // status ===2
                  <>
                    <View style={tw` items-center gap-5 py-2 justify-center`}>
                      <Button
                        mode="contained"
                        loading={doneLoading}
                        disabled={doneLoading}
                        onPress={Done}
                      >
                        Done
                      </Button>
                    </View>
                  </>
                )}
              </View>
            ) : (
              <Text variant="labelLarge">
                Request Status:{' '}
                <Text style={tw`text-[#6FAC46]`}>
                  {
                    requestType.find((x) => x.value == details.notary_request_status.toString())
                      ?.label
                  }
                </Text>
              </Text>
            )}
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
              {recipients.map((item, index) => (
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
                        {item.sign_type == 1
                          ? 'Need to Sign'
                          : item.sign_type == 2
                          ? 'In Person Signer'
                          : item.sign_type === 3
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
                <Text style={tw`font-thin`}>{details.requestMessage}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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

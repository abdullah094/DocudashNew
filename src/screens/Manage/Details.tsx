import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Menu, Button, IconButton, Divider } from 'react-native-paper';
import tw from 'twrnc';
import { Envelope, RootStackScreenProps, ViewDocument } from '@type/index';
import Loader from '@components/Loader';
import SigningOrderModal from '@components/SigningOrderModal';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '@stores/Slices';

interface IButton {
  text: string;
  onPress: () => void;
  pressed: boolean;
}

const Details = () => {
  const accessToken = useSelector(selectAccessToken);
  const navigation = useNavigation<RootStackScreenProps<'Details'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Details'>['route']>();
  const inbox: Envelope = route.params?.Envelope;
  const [data, setData] = useState<ViewDocument>();
  const [dataLoader, setDataLoader] = useState(true);

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [visibleMore, setVisibleMore] = React.useState(false);
  const openMenuMore = () => setVisibleMore(true);
  const closeMenuMore = () => setVisibleMore(false);

  console.log(inbox.uniqid, inbox.signature_id);

  useEffect(() => {
    const url = 'https://docudash.net/api/generate-signature/manage-doc-view/';

    console.log(url + inbox.uniqid + '/' + inbox.signature_id);
    console.log(`Bearer ${accessToken}`);
    axios
      .get(url + inbox.uniqid + '/' + inbox.signature_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data: ViewDocument = response.data;
        console.log('Data----', data);
        setData(data);
        setDataLoader(false);
      })
      .catch((error) => {
        console.log('Error----', error);
      });
  }, []);
  const voidEnvelope = () => {
    if (inbox.signature_id == undefined) return;

    const url = 'https://docudash.net/api/generate-signature/deleteEmailInbox';
    axios
      .post(
        url,
        { id: inbox.signature_id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const { status, message }: { status: boolean; message: string } = response.data;
        console.log(response.data);
        if (status) navigation.navigate('Inbox', { heading: 'Inbox' });
        else {
          alert(message);
        }
      })
      .catch((error) => {
        console.log('Error----', error);
      });
  };
  if (dataLoader) return <Loader />;

  return (
    <View style={tw`flex-1`}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={data?.generateSignatureDetails[0].emailSubject} />
      </Appbar.Header>
      <ScrollView>
        <View style={tw`p-4 gap-3 py-10`}>
          <View style={tw`flex-row items-center gap-3`}>
            <Text style={styles.heading}>{data?.generateSignatureDetails[0].emailSubject}</Text>
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
              Envelope ID:{' '}
              <Text style={tw`text-[#6FAC46]`}>{data?.generateSignatureDetails[0].uniqid}</Text>
            </Text>
            <Text>
              From:{' '}
              <Text style={tw`text-[#6FAC46]`}>
                {' '}
                {data?.generateSignatureDetails[0].user.first_name}{' '}
                {data?.generateSignatureDetails[0].user.last_name}
              </Text>
            </Text>
            <Text>
              Last change on{' '}
              <Text style={tw`text-[#6FAC46]`}>
                {new Date(data?.generateSignature.created_at).toUTCString()}
              </Text>
            </Text>
            <Text>
              Sent on{' '}
              <Text style={tw`text-[#6FAC46]`}>
                {new Date(data?.generateSignature.created_at).toUTCString()}
              </Text>
            </Text>
          </View>

          {/* Buttons */}
          <View style={tw`py-5`}>
            <View style={tw`flex-row items-center gap-5 py-2 justify-center`}>
              <Button
                mode="elevated"
                onPress={() => {
                  console.log('Sign');
                }}
              >
                Sign
              </Button>

              <Button
                mode="elevated"
                onPress={() => {
                  console.log('Move');
                }}
              >
                Move
              </Button>
            </View>
            <View style={tw`flex-row items-center gap-5 py-2 justify-center`}>
              <Button
                mode="elevated"
                onPress={() => {
                  console.log('Resend');
                }}
              >
                Resend
              </Button>
              <Menu
                visible={visibleMore}
                onDismiss={closeMenuMore}
                anchor={
                  <Button
                    contentStyle={tw`flex-row-reverse`}
                    mode="elevated"
                    icon="arrow-down-bold"
                    onPress={openMenuMore}
                  >
                    More
                  </Button>
                }
              >
                <Menu.Item onPress={() => {}} title="Copy" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Save as Template" />
                <Divider />
                <Menu.Item onPress={() => {}} title="History" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Transfer Ownership" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Export as CSV" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Delete" />
              </Menu>
            </View>
            <View style={tw`flex-row items-center gap-5 py-2 justify-center`}></View>
          </View>
          <View style={tw`flex-row items-center py-2 gap-7 p-5 justify-end`}>
            <TouchableOpacity>
              <Image style={tw`w-5 h-5 `} source={require('@assets/Download.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={tw`w-5 h-5 `} source={require('@assets/DocumentImage.png')} />
            </TouchableOpacity>
          </View>
          <View style={tw`py-2`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={styles.heading}>Recipients</Text>
              <SigningOrderModal
                senderName={data?.generateSignature.user.first_name}
                details={data?.generateSignatureDetails}
              />
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
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  heading: tw`font-bold text-5`,
  h2: tw`text-3 w-[50%]`,
  menu_block: tw`p-3 font-bold`,
});

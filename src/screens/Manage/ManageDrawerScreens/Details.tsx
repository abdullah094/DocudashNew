import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import tw from 'twrnc';
import { useCounterStore } from '../../../../MobX/TodoStore';
import { Envelope, ManageDrawerScreenProps, ViewDocument } from '../../../../types';
import Loader from '../../MainLoader/Loader';
import SigningOrderModal from '../Components/SigningOrderModal';

interface IButton {
  text: string;
  onPress: () => void;
  pressed: boolean;
}
const Button = ({ text, onPress, pressed }: IButton) => {
  return (
    <TouchableOpacity
      style={[
        tw`border-2 justify-center items-center h-10 w-30 rounded-lg`,
        pressed ? tw`bg-[#6FAC46] border-[#6FAC46]` : tw`bg-white border-black`,
      ]}
    >
      <Text style={[tw`text-4 font-bold `, pressed ? tw`text-white` : tw`text-black`]}>{text}</Text>
    </TouchableOpacity>
  );
};

const Details = () => {
  const Mobx = useCounterStore();
  const navigation = useNavigation<ManageDrawerScreenProps<'Details'>['navigation']>();
  const route = useRoute<ManageDrawerScreenProps<'Details'>['route']>();
  const inbox: Envelope = route.params?.Envelope;
  const [data, setData] = useState<ViewDocument>();
  const [dataLoader, setDataLoader] = useState(true);

  console.log(inbox.uniqid, inbox.signature_id);

  useEffect(() => {
    const url = 'https://docudash.net/api/generate-signature/manage-doc-view/';

    console.log(url + inbox.uniqid + '/' + inbox.signature_id);
    console.log(`Bearer ${Mobx.access_token}`);
    axios
      .get(url + inbox.uniqid + '/' + inbox.signature_id, {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
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
            <Menu>
              <MenuTrigger
                // @ts-ignore
                text={<AntDesign name="exclamationcircle" size={24} color="black" />}
              />
              <MenuOptions>
                <MenuOption
                  style={styles.menu_block}
                  onSelect={() => alert(`Save`)}
                  // @ts-ignore
                  text={<Text style={tw`font-bold text-black`}>Details</Text>}
                />
                <MenuOption
                  style={styles.menu_block}
                  onSelect={() => alert(`Save`)}
                  // @ts-ignore
                  text={
                    <View style={tw`gap-1`}>
                      <Text style={tw`font-bold text-black`}>Created At:{}</Text>
                      <Text style={tw`text-black`}>{data?.generateSignature.created_at}</Text>
                    </View>
                  }
                />
                <MenuOption
                  style={styles.menu_block}
                  onSelect={() => alert(`Save`)}
                  // @ts-ignore
                  text={
                    <View style={tw`gap-1`}>
                      <Text style={tw`font-bold text-black`}>Modified At</Text>
                      <Text style={tw`text-black`}>{data?.generateSignature.updated_at}</Text>
                    </View>
                  }
                />
                <MenuOption
                  style={styles.menu_block}
                  onSelect={() => alert(`Save`)}
                  // @ts-ignore
                  text={
                    <View style={tw`gap-1`}>
                      <Text style={tw`font-bold text-black`}>Owner</Text>
                      <Text style={tw`text-black`}>{data?.generateSignature.user.first_name}</Text>
                    </View>
                  }
                />
              </MenuOptions>
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
                text="Sign"
                onPress={() => {
                  console.log('Sign');
                }}
                pressed={true}
              />
              <Button
                text="Move"
                onPress={() => {
                  console.log('Move');
                }}
                pressed={false}
              />
            </View>
            <View style={tw`flex-row items-center gap-5 py-2 justify-center`}>
              <Button
                text="Resend"
                onPress={() => {
                  console.log('Resend');
                }}
                pressed={false}
              />
              <Menu>
                <MenuTrigger
                  // @ts-ignore
                  text={
                    <View
                      style={tw`border-2 justify-center items-center h-10 w-30 rounded-lg flex-row gap-1`}
                    >
                      <Text style={[tw`text-4 font-bold text-black`]}>More</Text>
                      <AntDesign name="caretdown" size={15} color="black" />
                    </View>
                  }
                />
                <MenuOptions>
                  <MenuOption
                    style={styles.menu_block}
                    onSelect={() => alert(`Save`)}
                    text="Copy"
                  />
                  <MenuOption
                    style={styles.menu_block}
                    onSelect={() => alert(`Save`)}
                    text="Save as Template"
                  />
                  <MenuOption
                    style={styles.menu_block}
                    onSelect={() => alert(`Save`)}
                    text="Void"
                  />
                  <MenuOption
                    style={styles.menu_block}
                    onSelect={() => navigation.navigate('TemplateHistory')}
                    text="History"
                  />
                  <MenuOption
                    style={styles.menu_block}
                    onSelect={() => alert(`Save`)}
                    text="Transfer Ownership"
                  />
                  <MenuOption
                    style={styles.menu_block}
                    onSelect={() => alert(`Save`)}
                    text="Export as CSV"
                  />
                  <MenuOption
                    style={styles.menu_block}
                    onSelect={() => alert(`Save`)}
                    text="Delete"
                  />
                </MenuOptions>
              </Menu>
            </View>
            <View style={tw`flex-row items-center gap-5 py-2 justify-center`}></View>
          </View>
          <View style={tw`flex-row items-center py-2 gap-7 p-5 justify-end`}>
            <TouchableOpacity>
              <Image style={tw`w-5 h-5 `} source={require('../../../assets/Download.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={tw`w-5 h-5 `} source={require('../../../assets/DocumentImage.png')} />
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
                  <Image
                    style={tw`w-5 h-5 mx-2`}
                    source={require('../../../assets/NeedToSign.png')}
                  />
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

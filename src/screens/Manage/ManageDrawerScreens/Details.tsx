import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import AntDesign from "@expo/vector-icons/AntDesign";
import SigningOrderModal from "../Components/SigningOrderModal";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RootStackScreenProps,
  EmailBar,
  ViewDocument,
} from "../../../../types";
import { log } from "react-native-reanimated";
import axios from "axios";
import { useCounterStore } from "../../../../MobX/TodoStore";

const NeedToSign = () => (
  <View style={tw`flex-row gap-2 items-center p-2`}>
    <Image
      style={tw`w-6 h-6`}
      source={require("../../../assets/Exclamation.png")}
    />
    <Text style={tw`font-bold text-[#6FAC46] text-4`}>Need to Sign</Text>
  </View>
);
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
      <Text
        style={[
          tw`text-4 font-bold `,
          pressed ? tw`text-white` : tw`text-black`,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Details = () => {
  const Mobx = useCounterStore();
  const navigation =
    useNavigation<RootStackScreenProps<"Details">["navigation"]>();
  const route = useRoute<RootStackScreenProps<"Details">["route"]>();
  const inbox: EmailBar = route.params;
  const [data, setData] = useState<ViewDocument>();

  console.log(inbox.uniqid, inbox.signature_id);

  useEffect(() => {
    const url = "https://docudash.net/api/generate-signature/manage-doc-view/";

    console.log(url + inbox.uniqid + "/" + inbox.signature_id);
    console.log(`Bearer ${Mobx.access_token}`);
    axios
      .get(url + inbox.uniqid + "/" + inbox.signature_id, {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
        },
      })
      .then((response) => {
        const data: ViewDocument = response.data;
        console.log("Data----", data);
        setData(data);
      })
      .catch((error) => {
        console.log("Error----", error);
      });
  }, []);

  return (
    <ScrollView>
      <View style={tw`p-4 gap-3 py-10`}>
        <Text style={styles.heading}>
          {data?.generateSignatureDetails[0].emailSubject}
        </Text>
        <Menu>
          <MenuTrigger
            text={
              <AntDesign name="exclamationcircle" size={24} color="black" />
            }
          />
          <MenuOptions>
            <MenuOption
              style={styles.menu_block}
              onSelect={() => alert(`Save`)}
              text={<Text style={tw`font-bold text-black`}>Details</Text>}
            />
            <MenuOption
              style={styles.menu_block}
              onSelect={() => alert(`Save`)}
              text={<Text style={tw`font-bold text-black`}>Last used:{}</Text>}
            />
            <MenuOption
              style={styles.menu_block}
              onSelect={() => alert(`Save`)}
              text={<Text style={tw`font-bold text-black`}>Last modified</Text>}
            />
            <MenuOption
              style={styles.menu_block}
              onSelect={() => alert(`Save`)}
              text={<Text style={tw`font-bold text-black`}>Owner</Text>}
            />
          </MenuOptions>
        </Menu>
        <View style={tw`mt-5 gap-1`}>
          <Text style={tw`text-[#6FAC46]`}>
            Envelope ID: {data?.generateSignatureDetails[0].uniqid}
          </Text>
          <Text>
            From:{" "}
            <Text style={tw`text-[#6FAC46]`}>
              {" "}
              {data?.generateSignatureDetails[0].user.first_name}{" "}
              {data?.generateSignatureDetails[0].user.last_name}
            </Text>
          </Text>
          <Text>
            Last change on
            {new Date(data?.generateSignature.created_at).toUTCString()}
          </Text>
          <Text>
            Sent on {new Date(data?.generateSignature.created_at).toUTCString()}
          </Text>
        </View>
        <NeedToSign />
        {/* Buttons */}
        <View style={tw`py-5`}>
          <View style={tw`flex-row items-center gap-5 py-2 justify-center`}>
            <Button
              text="Sign"
              onPress={() => {
                console.log("Sign");
              }}
              pressed={true}
            />
            <Button
              text="Connect"
              onPress={() => {
                console.log("Connect");
              }}
              pressed={false}
            />
          </View>
          <View style={tw`flex-row items-center gap-5 py-2 justify-center`}>
            <Button
              text="Move"
              onPress={() => {
                console.log("Move");
              }}
              pressed={false}
            />
            <Button
              text="Resend"
              onPress={() => {
                console.log("Resend");
              }}
              pressed={false}
            />
          </View>
          <View style={tw`flex-row items-center gap-5 py-2 justify-center`}>
            <Menu>
              <MenuTrigger
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
                  onSelect={() => navigation.navigate("TemplateHistory")}
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
        </View>
        <View style={tw`flex-row items-center py-2 gap-7 p-5 justify-end`}>
          <TouchableOpacity>
            <Image
              style={tw`w-5 h-5 `}
              source={require("../../../assets/Download.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={tw`w-5 h-5 `}
              source={require("../../../assets/DocumentImage.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`py-2`}>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={styles.heading}>Recipients</Text>
            <SigningOrderModal />
          </View>
          {data?.generateSignatureDetails.map((item) => (
            <View style={tw` mt-5 py-3 flex-row items-center`}>
              <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={styles.h2} numberOfLines={2}>
                    {item.recName}
                  </Text>
                </View>
                <Text style={tw`font-thin text-black`}>{item.recEmail}</Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Image
                  style={tw`w-5 h-5 mx-2`}
                  source={require("../../../assets/NeedToSign.png")}
                />
                <View>
                  <Text style={tw`text-3 font-bold`}>
                    {item.sign_type == 1 ? "Need to Sign" : "Sign"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={tw`py-2`}>
          <Text style={styles.heading}>Message</Text>
          <View style={tw`m-3 mt-5`}>
            <Text style={tw`font-thin`}>No message have been enterred</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  heading: tw`font-bold text-5`,
  h2: tw`text-3 w-[50%]`,
  menu_block: tw`p-3 font-bold`,
});

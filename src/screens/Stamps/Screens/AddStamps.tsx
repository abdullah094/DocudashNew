import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import React, {
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  Appbar,
  Button,
  Checkbox,
  RadioButton,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import tw from "twrnc";
import { colors } from "../../../Colors";
import AddSignatureDraw from "../Components/AddStampDraw";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useCounterStore } from "../../../../MobX/TodoStore";

import { Signature, SignaturePreview, User } from "../../../../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import ChooseSignatureItem from "../Components/ChooseStampItem";

const AddStamp = () => {
  const Mobx = useCounterStore();
  const user: User = Mobx.user;
  const [fullName, setFullName] = React.useState(
    user.first_name + " " + user.last_name
  );

  const [initials, setInitials] = React.useState(
    fullName
      .replace(/\b(\w)\w+/g, "$1")
      .replace(/\s/g, "")
      .replace(/\.$/, "")
      .toUpperCase()
  );
  const [value, setValue] = React.useState("choose");
  const [list, setList] = React.useState(
    new Array(6).fill({ selected: false })
  );
  const [selectedUri, setSetselectedUri] = useState<string>("");
  const [selectedInitialUri, setSetselectedInitialUri] = useState<string>("");
  const [sign, setSign] = useState<Array<{}> | undefined>();
  const [initial, setInitial] = useState<Array<{}> | undefined>();
  const navigation = useNavigation();
  const route = useRoute();
  const signaturePreview = route.params as SignaturePreview;

  useEffect(() => {
    if (signaturePreview) {
      setList((prev) =>
        prev.map((sign, i) =>
          i === signaturePreview.DT_RowIndex - 1
            ? { ...sign, selected: true }
            : { ...sign, selected: false }
        )
      );
    }
  }, []);

  const uploadStamp = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 2],
        quality: 0.1,
        base64: true,
      });

      if (!result.cancelled) {
        setSetselectedUri(result.assets[0].base64);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const create = () => {
    axios
      .post(
        "https://docudash.net/api/signatures/create",
        {
          signature: "data:image/png;base64," + selectedUri,
          initial: "data:image/png;base64," + selectedInitialUri,
        },
        {
          headers: {
            Authorization: `Bearer ${Mobx.access_token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        Alert.alert("Signature added");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={tw`p-3 gap-2 overflow-hidden flex-1 w-full`}>
      {/* Create sign button */}
      <View style={tw`p-5`}>
        <Text>Stamps</Text>

        <View>
          <Image
            style={tw`h-15 w-15 `}
            source={require("../../../assets/Stamp-drop-icon.png")}
          />
        </View>
        <Button onPress={create} mode="contained" style={tw`mt-4`}>
          Create
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddStamp;

const styles = StyleSheet.create({
  h2: tw`font-bold text-4`,
});

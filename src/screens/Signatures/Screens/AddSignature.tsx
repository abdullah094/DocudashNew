import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  Checkbox,
  RadioButton,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import tw from "twrnc";
import { colors } from "../../../Colors";
import AddSignatureDraw from "../Components/AddSignauteDraw";
import * as DocumentPicker from "expo-document-picker";
const AddSignature = () => {
  const [fullName, setFullName] = React.useState("");
  const [initals, setInitials] = React.useState("");
  const [value, setValue] = React.useState("choose");

  const data = [
    {
      id: 0,
      sign: "Abduulajh",
      initials: "Ab",
    },
    {
      id: 1,
      sign: "Abduulajh",
      initials: "Ab",
    },
  ];
  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["*/*"], // You can specify the file types here (e.g., 'image/*', 'application/pdf', etc.)
      });
      console.log(result);
    } catch (err) {
      console.log("err");
    }
  };
  const RenderItem = ({ initials, ischecked }: any) => {
    return (
      <View style={tw` p-2 py-4 flex-row items-center gap-2 mt-3`}>
        <View
          style={[
            tw`border-2 h-5 w-5 rounded-full border-gray-400 `,
            ischecked ? tw`bg-[${colors.green}]` : tw`bg-white`,
          ]}
        ></View>
        <View style={tw`flex-row items-center gap-2  h-25 ml-2`}>
          <Image
            style={[tw`h-25 w-3`, { tintColor: colors.green }]}
            resizeMode="contain"
            source={require("../../../assets/WhiteLine.png")}
          />
          <View style={tw`h-full justify-around`}>
            <Text style={styles.h2}>Sign by</Text>
            <Text>ABdullah</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-2  h-25 ml-25`}>
          <Image
            style={[tw`h-25 w-3`, { tintColor: colors.green }]}
            resizeMode="contain"
            source={require("../../../assets/WhiteLine.png")}
          />
          <View style={tw`h-full justify-around`}>
            <Text style={styles.h2}>Sign by</Text>
            <Text>AB</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={tw`p-3 gap-2`}>
        <TextInput
          mode="outlined"
          label="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          label="Initials"
          mode="outlined"
          value={initals}
          onChangeText={(text) => setInitials(text)}
        />
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "choose",
              label: "Choose",
            },
            {
              value: "draw",
              label: "Draw",
            },
            { value: "upload", label: "Upload" },
          ]}
        />
        {value === "choose" ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RenderItem initials={item.initials} />}
          />
        ) : null}
        {value === "draw" ? <AddSignatureDraw /> : null}
        {value === "upload" ? (
          <View style={tw`bg-white px-8 py-8 rounded-md`}>
            <View
              style={tw` border-2 py-10 rounded-xl border-dashed border-[${colors.blue}] justify-center items-center`}
            >
              <TouchableOpacity style={tw`p-1`} onPress={uploadFile}>
                <Image
                  style={tw`h-10 w-10 self-center`}
                  source={require("../../../assets/Upload.png")}
                />
                <Text style={tw`text-[${colors.blue}] mt-2`}>
                  Drop documents here to get started
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default AddSignature;

const styles = StyleSheet.create({
  h2: tw`font-bold text-4`,
});

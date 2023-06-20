import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { colors } from "../../../Colors";

interface IEmail {
  image: File | null;
  name: string;
  description: string;
  selected: boolean;
}

const EmailBar = ({ name, image, description, selected }: IEmail) => {
  return (
    <View style={tw`p-4 gap-3 bg-[${colors.green}]`}>
      <View style={tw`flex-row overflow-hidden gap-2 items-center`}>
        <Image
          style={tw`w-10 h-10 rounded-full`}
          source={require("../../../assets/ProfielPic.png")}
        />
        <View>
          <Text style={tw`font-bold text-black`}>Waqar Khan</Text>
          <Text style={tw`font-light text-3 w-[90%] text-gray-900`}>
            Here is your signed document: Scan 23-May-2023 at 8:29:54 PM
          </Text>
        </View>
      </View>
      <View style={tw`flex-row items-center gap-3 overflow-hidden`}>
        <Image
          style={[tw`h-4 w-3.5 `, { tintColor: colors.gray }]}
          source={require("../../../assets/PaperClip.png")}
        />
        <Text style={tw`font-thin text-gray-900`}>
          To: Waqar Ahmed Khan, Waqar Ahmed Khan
        </Text>
      </View>
    </View>
  );
};

export default EmailBar;

const styles = StyleSheet.create({});

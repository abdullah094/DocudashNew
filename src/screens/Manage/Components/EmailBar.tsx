import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { colors } from "../../../Colors";
import SkeletonLoader from "expo-skeleton-loader";

interface IEmail {
  image: File | null;
  name: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  length: number;
}

const Skeleton = () => {
  return (
    <SkeletonLoader boneColor={"#D3D3D3"}>
      <SkeletonLoader.Container style={tw`my-2`}>
        <SkeletonLoader.Container
          style={tw`flex-row overflow-hidden gap-2 items-center px-5 `}
        >
          <SkeletonLoader.Item style={tw`w-10 h-10 rounded-full`} />
          <SkeletonLoader.Container style={tw`overflow-hidden w-70`}>
            <SkeletonLoader.Item style={tw`flex-1 h-5 my-1`} />
            <SkeletonLoader.Item style={tw`w-100 h-2`} />
          </SkeletonLoader.Container>
        </SkeletonLoader.Container>
        <SkeletonLoader.Item style={tw`w-80 h-5 self-center mt-5`} />
      </SkeletonLoader.Container>
    </SkeletonLoader>
  );
};

const EmailBar = ({ name, image, description, selected, onPress }: IEmail) => {
  const [setskelText, setSetskelText] = useState(false);

  if (!name) return <Skeleton />;
  return (
    <>
      <TouchableOpacity
        delayPressIn={25}
        activeOpacity={0.5}
        style={tw`p-4 gap-3 bg-[${colors.white}]`}
        onPress={onPress}
      >
        <View style={tw`flex-row overflow-hidden gap-2 items-center flex-1`}>
          <Image
            style={tw`w-10 h-10 rounded-full`}
            source={require("../../../assets/ProfielPic.png")}
          />
          <View>
            <Text style={tw`font-bold text-black`}>{name}</Text>
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
      </TouchableOpacity>
    </>
  );
  return <Skeleton />;
};

export default EmailBar;

const styles = StyleSheet.create({});

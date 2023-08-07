import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { colors } from "../../../Colors";
import SkeletonLoader from "expo-skeleton-loader";
import { Envelope, EmailBar as IEmailBar } from "../../../../types";
import { useNavigation } from "@react-navigation/native";

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

const EmailBar = ({
  item,
  loading,
  heading,
}: {
  item: Envelope;
  loading: boolean;
  heading: string;
}) => {
  const navigation = useNavigation();
  console.log(heading);
  if (loading) return <Skeleton />;

  return (
    <>
      <TouchableOpacity
        delayPressIn={25}
        activeOpacity={0.5}
        style={tw`p-4 px-5 gap-3 bg-[${colors.white}]`}
        onPress={() =>
          heading == "Inbox"
            ? navigation.navigate("Details", item)
            : navigation.navigate("Edit", { Envelope: item })
        }
      >
        <View style={tw`flex-row overflow-hidden gap-2 items-center h-16`}>
          <Image
            style={tw`w-10 h-10 rounded-full`}
            source={require("../../../assets/ProfielPic.png")}
          />
          <View>
            <Text style={tw`font-bold text-black`}>{item?.emailSubject}</Text>
            <Text style={tw`font-light text-3 w-50 text-gray-900`}>
              {item?.emailMessage}
            </Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-3 overflow-hidden`}>
          <Image
            style={[tw`h-4 w-3.5 `, { tintColor: colors.gray }]}
            source={require("../../../assets/PaperClip.png")}
          />
          <Text style={tw`font-thin text-gray-900`}>
            From: {item?.created_by}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default EmailBar;

const styles = StyleSheet.create({});

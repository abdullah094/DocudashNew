import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

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
  return (
    <ScrollView>
      <View style={tw`p-4 gap-3 py-10`}>
        <Text style={styles.heading}>
          Complete with Docudash: Screenshot 2023-05-29 at 7.57.35 PM.png
        </Text>
        <View style={tw`mt-5 gap-1`}>
          <Text style={tw`text-[#6FAC46]`}>Envelope ID</Text>
          <Text>
            From: <Text style={tw`text-[#6FAC46]`}>Waqar Ahmed Khan</Text>
          </Text>
          <Text>Last change on 5/29/2023 | 08:39:43 pm</Text>
          <Text>Sent on 5/29/2023 | 08:38:43 pm</Text>
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
              pressed={false}
            />
            <Button
              text="Connect"
              onPress={() => {
                console.log("Connect");
              }}
              pressed={true}
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
          <Text style={styles.heading}>Recipients</Text>
          <View style={tw` mt-5 py-3`}>
            <View>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={styles.h2} numberOfLines={2}>
                  Waqar Ahmed
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    style={tw`h-3 w-3 `}
                    source={require("../../../assets/SigningOrder.png")}
                  />
                  <Text>SIGNING ORDER</Text>
                </View>
              </View>
              <Text style={tw`font-thin text-black`}>
                urspeacial1one@gmail.com
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-2 py-4`}>
              <Image
                style={tw`w-5 h-5`}
                source={require("../../../assets/NeedToSign.png")}
              />
              <View>
                <Text style={tw`text-4 font-bold`}>Needs to Sign</Text>
                <Text style={tw`font-thin text-3`}>
                  Viewed on 5/29/2023 | 08:39:43 pm
                </Text>
              </View>
            </View>
          </View>
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
  h2: tw`text-5 w-[50%]`,
});

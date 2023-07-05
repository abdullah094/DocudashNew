import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import tw from "twrnc";
import { List, Divider, Button } from "react-native-paper";

interface IBox {
  heading: string;
  text: string;
}
const Box = ({ heading, text }: IBox) => {
  return (
    <View style={tw`overflow-hidden gap-1`}>
      <Text style={styles.box_heading}>{heading}</Text>
      <Text style={styles.light_text}>{text}</Text>
    </View>
  );
};
const TemplateHistory = () => {
  const arr = [
    {
      id: 0,
      time: "5/29/2023 | 04:51:25 pm",
      description: "Waqar Ahmed Khan (English (us)) [api:119.73.104.82]",
      action: "Created",
    },
    {
      id: 1,
      time: "5/29/2023 | 04:51:25 pm",
      description: "Waqar Ahmed Khan (English (us)) [api:119.73.104.82]",
      action: "Created",
    },

    {
      id: 2,
      time: "5/29/2023 | 04:51:25 pm",
      description: "Waqar Ahmed Khan (English (us)) [api:119.73.104.82]",
      action: "Created",
    },
    {
      id: 3,
      time: "5/29/2023 | 04:51:25 pm",
      description: "Waqar Ahmed Khan (English (us)) [api:119.73.104.82]",
      action: "Created",
    },
  ];
  return (
    <ScrollView>
      <View style={tw`p-3 bg-white gap-5 pb-30`}>
        <Text style={tw`text-6 font-bold `}>Template History</Text>
        <View style={tw`py-5 gap-5`}>
          <Text style={tw`font-bold text-4.5 py-2`}>Details</Text>
          <Box
            heading={"Subject"}
            text={
              "Complete with DocuSign: Screenshot2023-05-26 at 10.26.30 PM.pngs"
            }
          />
          <Box
            heading={"Template ID"}
            text={"9943d8e9-2ec5-4b87-ad81-0b63fa4be89b"}
          />
          <Box heading={"Location"} text={"Online"} />
          <Box heading={"Time Zone"} text={"My computer's time zone"} />
          <Box
            heading={"Documents"}
            text={"Screenshot 2023-05-26 at 10.26.30 PM.png"}
          />
          <Box heading={"Recipients"} text={"Waqar Ahmed Khan"} />
          <Box heading={"Owner"} text={"Waqar Ahmed Khan"} />
        </View>
        <View style={tw`gap-3`}>
          <Text style={tw`font-bold text-4.5 py-2`}>Activities</Text>
        </View>
        {arr.map(({ id, time, description, action }, index) => {
          return (
            <>
              <List.Item
                key={id}
                title={time}
                description={description}
                right={(props) => <Text>{action}</Text>}
              />
              <Divider />
            </>
          );
        })}
        <Button
          icon="printer"
          mode="outlined"
          style={tw`w-30 mx-5`}
          onPress={() => console.log("Pressed")}
        >
          Print
        </Button>
      </View>
    </ScrollView>
  );
};

export default TemplateHistory;

const styles = StyleSheet.create({
  box_heading: tw`font-bold text-4`,
  light_text: tw`text-gray-600 font-light`,
});

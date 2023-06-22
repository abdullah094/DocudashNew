import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import EmailBar from "../Components/EmailBar";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { observer } from "mobx-react";
import { useCounterStore } from "../../../../MobX/TodoStore";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

interface IInbox {
  data: object | null;
  heading: string | null;
}
const Inbox = observer(() => {
  const [data, setData] = useState<Array<object>>(new Array(5));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const route = useRoute();
  const heading = route.params?.heading || ("Inbox" as string);
  const Mobx = useCounterStore();
  const fetchData = async () => {
    const h = heading.toLowerCase();
    const url = "https://docudash.net/api/generate-signature/";
    console.log(url + h);
    setData(new Array(10));
    await axios
      .get(url + h, {
        headers: {
          Authorization: `Bearer ${"3|ZbLCpMQxBKRFbfjAdDHtAwwhlMCEuSMiRKnF2FEU"}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log("Error----", error);
        setData([]);
        setIsRefreshing(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [heading, isRefreshing]);
  const onRefresh = () => {
    setIsRefreshing(true);
  };

  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={data}
        ListHeaderComponent={
          <Text style={tw`font-bold text-6 p-4 tracking-wider`}>{heading}</Text>
        }
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        contentContainerStyle={[tw`pb-25 py-5`, { alignSelf: "stretch" }]}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmailBar
            image={null}
            name={item?.emailSubject}
            description={""}
            selected={false}
            onPress={() => {
              console.log("email pressed");
            }}
          />
        )}
      />
    </View>
  );
});

export default Inbox;

const styles = StyleSheet.create({});

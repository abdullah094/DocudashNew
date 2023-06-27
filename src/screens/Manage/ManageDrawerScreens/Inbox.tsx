import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import EmailBar from "../Components/EmailBar";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { observer } from "mobx-react";
import { useCounterStore } from "../../../../MobX/TodoStore";
import { LoginStackScreenProps } from "../../../../types/type";
import { EmailBar as IEmailbar } from "../../../../types";

interface IInbox {
  data: object | null;
  heading: string | null;
}
const Inbox = observer(() => {
  const [data, setData] = useState<Array<IEmailbar>>(new Array(5));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation =
    useNavigation<LoginStackScreenProps<"Inbox">["navigation"]>();
  const route = useRoute<LoginStackScreenProps<"Inbox">["route"]>();
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
          Authorization: `Bearer ${Mobx.access_token}`,
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
        renderItem={({ item }: { item: IEmailbar }) => (
          <EmailBar
            image={null}
            name={item?.emailSubject}
            description={""}
            selected={false}
            onPress={() => {
              navigation.navigate("Details");
            }}
          />
        )}
      />
    </View>
  );
});

export default Inbox;

const styles = StyleSheet.create({});

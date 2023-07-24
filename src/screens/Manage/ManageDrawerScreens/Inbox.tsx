import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import EmailBar from "../Components/EmailBar";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { observer } from "mobx-react";
import { useCounterStore } from "../../../../MobX/TodoStore";
import {
  LoginStackScreenProps,
  ManageDrawerScreenProps,
} from "../../../../types/type";
import { EmailBar as IEmailbar } from "../../../../types";
import { Button } from "react-native-paper";
import FilterModal from "../Components/FilterModal";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../../../Colors";
interface IInbox {
  data: object | null;
  heading: string | null;
}
const Inbox = observer(() => {
  const [data, setData] = useState<Array<IEmailbar>>(new Array(5));
  function filter(name: string | undefined) {
    if (name) {
      const filtered = data.filter((x) => x.emailSubject.includes(name));
      return filtered;
    }
  }
  console.log();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [Name, setName] = useState<string | undefined>();
  const navigation =
    useNavigation<ManageDrawerScreenProps<"Inbox">["navigation"]>();
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
        console.log("data", response.data.data);
        setData(response.data.data);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log("Error----", error);
        setData([]);
        setIsRefreshing(false);
      });
  };

  const Header = () => (
    <Pressable onPress={() => navigation.toggleDrawer()} style={tw`p-5`}>
      <Entypo name="menu" color={colors.black} size={30} />
    </Pressable>
  );
  useEffect(() => {
    fetchData();
  }, [heading, isRefreshing]);
  const onRefresh = () => {
    setIsRefreshing(true);
  };
  console.log(Name);

  return (
    <View style={tw`flex-1`}>
      <Header />
      <FlatList
        data={filter(Name) ? filter(Name) : data}
        ListHeaderComponent={
          <View style={tw`flex-row items-center justify-between px-5 mb-5 `}>
            <Text
              style={tw`font-bold text-6  tracking-wider`}
              numberOfLines={1}
            >
              {heading}
            </Text>
            <FilterModal
              onPress={(item: React.SetStateAction<string | undefined>) =>
                setName(item)
              }
            />
          </View>
        }
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        contentContainerStyle={[tw`pb-25 py-5`, { alignSelf: "stretch" }]}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EmailBar item={item} />}
      />
    </View>
  );
});

export default Inbox;

const styles = StyleSheet.create({});

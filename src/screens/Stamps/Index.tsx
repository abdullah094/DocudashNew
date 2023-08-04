import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { colors } from "../../Colors";
import { Button, Chip, DataTable, Switch } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import axios from "axios";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCounterStore } from "../../../MobX/TodoStore";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RootStackParamList,
  StampPreview,
  SignaturesListAPI,
  StampListAPI,
} from "../../../types";

const Index = () => {
  const [list, setList] = React.useState<StampPreview[]>();
  const [isFetching, setIsFetching] = React.useState(false);
  const Mobx = useCounterStore();
  const navigation = useNavigation();
  const route = useRoute();
  console.log(Mobx.access_token);

  const fetchList = () => {
    setIsFetching(true);
    axios
      .get("https://docudash.net/api/stamps", {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
        },
      })
      .then((response) => {
        const { data, message, status } = response.data as StampListAPI;
        if (status) {
          setList(data.data);
        } else {
          alert(message);
        }
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
      });
  };
  React.useEffect(() => {
    fetchList();
  }, [route]);

  const Delete = (id: number) => {
    axios
      .post(
        "https://docudash.net/api/stamps/delete",
        {
          deleteId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Mobx.access_token}`,
          },
        }
      )
      .then((response) => {
        fetchList();
        const data = response.data;
        console.log(data);
      });
  };
  const StatusUpdate = (id: number, status: number | boolean) => {
    console.log(id, status);

    axios
      .post(
        "https://docudash.net/api/stamps/statusUpdate",
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${Mobx.access_token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
      });
  };

  const RenderItem = ({ item }) => {
    const [more, setMore] = React.useState(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(
      item.status === 1 ? true : false
    );
    console.log("switchStatus", isSwitchOn);

    const onToggleSwitch = () => {
      setIsSwitchOn(!isSwitchOn);

      StatusUpdate(item.id, !isSwitchOn ? 1 : 0);
      fetchList();
    };

    return (
      <View style={tw` bg-white p-2 my-1 gap-2 px-3`}>
        <View style={tw`flex-row gap-2 overflow-hidden`}>
          <View style={tw`flex-1 gap-3 p-2 items-start overflow-hidden `}>
            <Image
              style={tw`w-20 h-20 rounded-full overflow-hidden `}
              resizeMode="contain"
              source={{
                uri: item.image_base64,
              }}
            />

            <Text style={tw`font-medium`}>{item.title}</Text>

            <Text style={tw`font-medium overflow-hidden`}>
              {item.stamp_code}
            </Text>
          </View>
          <View style={tw` p-2 justify-between`}>
            <View style={tw`gap-2`}>
              <Text style={tw`font-medium`}>Status:</Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <View>
              <View style={tw`flex-row items-center gap-1`}>
                <Chip
                  selectedColor={colors.blue}
                  onPress={() => {
                    navigation.navigate("AddStamp", item);
                    // console.log(item);
                  }}
                >
                  Edit
                </Chip>
                <Chip onPress={() => Delete(item.id)}>Delete</Chip>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={tw`m-4 gap-1 `}>
        <Text style={tw`text-black text-5 font-bold `}>Stamps</Text>
        <Text style={tw`text-[${colors.gray}] text-3`}>
          Add or update your name and stamps.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddStamp")}
          style={tw`bg-[${colors.green}] justify-center items-center w-35 h-10 rounded-md self-end m-4`}
        >
          <Text style={tw`text-white`}>Add Stamp</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        onRefresh={fetchList}
        refreshing={isFetching}
        contentContainerStyle={tw`pb-50`}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});

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
import { Button, DataTable, Switch } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import axios from "axios";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCounterStore } from "../../../MobX/TodoStore";

const Index = () => {
  const [list, setList] = React.useState();
  const Mobx = useCounterStore();

  const fetchList = () => {
    axios
      .get("https://docudash.net/api/signatures/list", {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setList(data.data);
      });
  };
  React.useEffect(() => {
    fetchList();
  }, []);

  const SwitchComp = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
  };
  const DropdownComp = () => {
    const [action, setAction] = React.useState("");
    const [showDropDown, setShowDropDown] = React.useState(false);
    const ActionList = [
      {
        label: "Edit",
        value: "edit",
      },
      {
        label: "Delete",
        value: "delete",
      },
    ];

    return (
      <DropDown
        label={"Action"}
        mode={"outlied"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={action}
        setValue={setAction}
        list={ActionList}
      />
    );
  };
  const TableRow = () => {
    const [openModal, setOpenModal] = React.useState(false);

    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModal}
          onDismiss={() => setOpenModal(false)}
        >
          <View style={tw`flex-1 justify-center items-center `}>
            <View
              style={tw`border-2  w-70 rounded-lg bg-white p-5 gap-4 pb-25`}
            >
              <Pressable
                style={tw`absolute top-1 right-1 p-1`}
                onPress={() => setOpenModal(false)}
              >
                <MaterialCommunityIcons name="close-circle" size={30} />
              </Pressable>
              <Text style={tw`font-bold`}>Status</Text>
              <SwitchComp />
              <Text style={tw`font-bold`}>Action</Text>
              <DropdownComp />
            </View>
          </View>
        </Modal>
        <DataTable.Row>
          <DataTable.Cell style={tw`items-center h-35`}>
            <Image
              style={tw`w-20 h-4`}
              resizeMode="contain"
              source={require("../../assets/docudash_pow_logo.png")}
            />
          </DataTable.Cell>
          <DataTable.Cell style={tw` items-center justify-center h-35`}>
            <Image
              style={tw`w-15 h-4`}
              resizeMode="contain"
              source={require("../../assets/docudash_pow_logo.png")}
            />
          </DataTable.Cell>
          <DataTable.Cell style={tw` items-center h-35 justify-center`}>
            <View style={tw`justify-start items-center gap-2 overflow-hidden`}>
              <Text style={tw`text-3 text-[${colors.gray}]`} numberOfLines={2}>
                {"5qDXe96-pkhNTj-55211"}
              </Text>
              <Button
                onPress={() => setOpenModal(!openModal)}
                icon="dots-horizontal"
              ></Button>
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      </>
    );
  };

  const RenderItem = ({ signature, initial, signature_code }) => {
    const [more, setMore] = React.useState(false);
    return (
      <View style={tw` bg-white p-2 my-1`}>
        <View style={tw`flex-row gap-2`}>
          <View>
            <Text style={tw`font-medium`}>Signed by</Text>
            <Image
              style={tw`w-15 h-15`}
              resizeMode="contain"
              source={{ uri: signature }}
            />
          </View>
          <View>
            <Text style={tw`font-medium`}>Initials</Text>
            <Image
              style={tw`w-15 h-15 `}
              resizeMode="contain"
              source={{ uri: initial }}
            />
          </View>
          <View style={tw`gap-4`}>
            <Text style={tw`font-medium overflow-hidden`}>Signature Code</Text>
            <Text>{signature_code}</Text>
          </View>
          <View style={tw`gap-4 justify-center p-2 items-center`}>
            <Button
              onPress={() => setMore(!more)}
              icon="dots-horizontal"
              children={undefined}
            ></Button>
          </View>
        </View>
        {more ? (
          <View style={tw`gap-2`}>
            <View style={tw`flex-row items-center gap-4`}>
              <Text>Status:</Text>
              <SwitchComp />
            </View>
            <View style={tw`flex-row items-center gap-4`}>
              <Text>Action:</Text>
              <DropdownComp />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={tw`pb-100 `}>
      <View style={tw`m-5 gap-1 `}>
        <Text style={tw`text-black text-5 font-bold `}>Signautres</Text>
        <Text style={tw`text-[${colors.gray}] text-3`}>
          Add or update your name and signature styles.
        </Text>
        <TouchableOpacity
          style={tw`bg-[${colors.green}] justify-center items-center w-35 h-10 rounded-md self-end m-4`}
        >
          <Text style={tw`text-white`}>Add Signature</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RenderItem
              signature={item.signature}
              initial={item.initial}
              signature_code={item.signature_code}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});

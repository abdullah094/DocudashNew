import {
  Alert,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Button, Searchbar } from "react-native-paper";
import tw from "twrnc";

import { DateTimePicker } from "react-native-ui-lib";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
interface IFilter {
  onPress: () => void;
}

const FilterModal = ({ onPress }: IFilter) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempNameList, setTempNameList] = useState("");
  const [date, setDate] = useState(false);
  const [SelectedDate, setSelectedDate] = useState<Date>(new Date());
  const [show, setshow] = useState(false);
  const [text, settext] = useState("Select date and time");
  const [mode, setMode] = useState("date");
  console.log(show);

  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setshow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = "Hours:" + tempDate.getHours() + "/" + tempDate.getMinutes();
    settext(fDate + "\n" + fTime);
    console.log(fDate + " " + fTime);
  };

  const showMode = (currentMode) => {
    setshow(true);
    setMode(currentMode);
  };
  return (
    <>
      <Button
        icon="filter"
        mode="contained"
        onPress={() => setModalVisible(true)}
      >
        Filter
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <Pressable
            style={tw`border-2 border-gray-300 p-7 gap-3 bg-white rounded-lg`}
          >
            <Pressable
              style={tw`absolute top-1 right-1 p-1`}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close-circle" size={30} />
            </Pressable>
            <Text style={styles.heading}>Select Field</Text>

            <Searchbar
              placeholder="Name"
              value={tempNameList}
              onChangeText={(text) => setTempNameList(text)}
              style={tw`w-60`}
            />
            {/* {tempNameList ? (
              <View>
                <Pressable>
                  <Text>asd</Text>
                </Pressable>
              </View>
            ) : null} */}

            <Text style={styles.heading}>Date</Text>
            <DateTimePicker
              value={SelectedDate}
              // title="Select time"
              onChange={(date: Date) => setSelectedDate(date)}
              // placeholder="Placeholder"

              display="spinner"
              renderInput={() => (
                <Searchbar
                  placeholder="All"
                  value={String(SelectedDate).slice(0, 15)}
                  style={tw`w-60`}
                />
              )}
            />
            <View style={tw`flex-row items-center gap-2 my-3`}>
              <Button
                mode="contained"
                onPress={() => {
                  onPress(tempNameList), setModalVisible(false);
                }}
              >
                Apply
              </Button>
              <Button>Reset</Button>
            </View>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  heading: tw`font-bold text-4`,
});

import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { ReactNode, useState } from "react";
import tw from "twrnc";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../../Colors";
import { Button, Divider, HelperText, TextInput } from "react-native-paper";
import { useCounterStore } from "../../../../MobX/TodoStore";
import { User } from "../../../../types";
import axios from "axios";

const InfoEditModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const Mobx = useCounterStore();
  const user = useCounterStore().user as User;
  const [company, setCompany] = useState(user.company ?? "");
  const [address1, setAddress1] = useState(user.address1 ?? "");
  const [address2, setAddress2] = useState(user.address2 ?? "");
  const [country, setCountry] = useState(user.country ?? "");
  const [state, setState] = useState(user.state ?? "");
  const [city, setCity] = useState(user.city ?? "");
  const [zip_code, setZip_code] = useState(user.zip_code ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [hasErrors, setHasErrors] = useState<{
    company?: string[];
    address1?: string[];
    address2?: string[];
    country?: string[];
    state?: string[];
    city?: string[];
    zip_code?: string[];
    phone?: string[];
  }>();

  const onSave = () => {
    setHasErrors({});
    // if (company.length == 0) {
    //   Alert.alert("Please enter a company name.");
    //   return;
    // }
    // if (address1.length == 0) {
    //   Alert.alert("Please enter a address1.");
    //   return;
    // }
    // if (address2.length == 0) {
    //   Alert.alert("Please enter a address2.");
    //   return;
    // }
    // if (country.length == 0) {
    //   Alert.alert("Please enter a country.");
    //   return;
    // }
    // if (state.length == 0) {
    //   Alert.alert("Please enter a state.");
    //   return;
    // }
    // if (city.length == 0) {
    //   Alert.alert("Please enter a city.");
    //   return;
    // }
    // if (zip_code.length == 0) {
    //   Alert.alert("Please enter a zip_code.");
    //   return;
    // }
    // if (phone.length == 0) {
    //   Alert.alert("Please enter a phone.");
    //   return;
    // }
    axios
      .post(
        "https://docudash.net/api/profiles",
        {
          action_type: "ContactInformation",
          company: company,
          address1: address1,
          address2: address2,
          country: country,
          state: state,
          city: city,
          zip_code: zip_code,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${Mobx.access_token}`,
          },
        }
      )
      .then((response) => {
        const {
          status,
          message,
        }: {
          status: boolean;
          message: {
            company: string[];
            address1: string[];
            address2: string[];
            country: string[];
            state: string[];
            city: string[];
            zip_code: string[];
            phone: string[];
          };
        } = response.data;
        if (status) {
          Mobx.AddUser({
            ...Mobx.user,
            company: company,
            address1: address1,
            address2: address2,
            country: country,
            state: state,
            city: city,
            zip_code: zip_code,
            phone: phone,
          });

          setModalVisible(false);
        } else {
          setHasErrors(message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button
        mode="contained"
        style={tw`rounded-lg`}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        Update
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50  `}>
          <View style={tw`bg-white m-2 p-2 gap-2 w-72 h-96 rounded-lg`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-xl`}>Update Info</Text>
              <MaterialCommunityIcons
                name="close"
                size={24}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Divider></Divider>
            <ScrollView>
              <View style={tw`gap-2`}>
                <Text style={tw`text-gray-500`}>
                  Enter your new info below.
                </Text>
                <TextInput
                  label="Company"
                  value={company}
                  onChangeText={(text) => setCompany(text)}
                />
                {hasErrors?.company != undefined && (
                  <HelperText type="error">{hasErrors.company[0]}</HelperText>
                )}

                <TextInput
                  label="Address 1"
                  value={address1}
                  onChangeText={(text) => setAddress1(text)}
                />
                {hasErrors?.address1 != undefined && (
                  <HelperText type="error">{hasErrors.address1[0]}</HelperText>
                )}
                <TextInput
                  label="Address 2"
                  value={address2}
                  onChangeText={(text) => setAddress2(text)}
                />
                {hasErrors?.address2 != undefined && (
                  <HelperText type="error">{hasErrors.address2[0]}</HelperText>
                )}
                <TextInput
                  label="Country"
                  value={country}
                  onChangeText={(text) => setCountry(text)}
                />
                {hasErrors?.country != undefined && (
                  <HelperText type="error">{hasErrors.country[0]}</HelperText>
                )}
                <TextInput
                  label="State"
                  value={state}
                  onChangeText={(text) => setState(text)}
                />
                {hasErrors?.state != undefined && (
                  <HelperText type="error">{hasErrors.state[0]}</HelperText>
                )}
                <TextInput
                  label="City"
                  value={city}
                  onChangeText={(text) => setCity(text)}
                />
                {hasErrors?.city != undefined && (
                  <HelperText type="error">{hasErrors.city[0]}</HelperText>
                )}
                <TextInput
                  label="Zip Code"
                  value={zip_code}
                  onChangeText={(text) => setZip_code(text)}
                />
                {hasErrors?.zip_code != undefined && (
                  <HelperText type="error">{hasErrors.zip_code[0]}</HelperText>
                )}
                <TextInput
                  label="phone"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
                {hasErrors?.phone != undefined && (
                  <HelperText type="error">{hasErrors.phone[0]}</HelperText>
                )}
              </View>
            </ScrollView>

            <Divider></Divider>
            <View style={tw`flex-row items-center gap-4 justify-between`}>
              <Button style={tw`rounded-lg`} mode="contained" onPress={onSave}>
                Update
              </Button>
              <Button
                style={tw`rounded-lg`}
                mode="outlined"
                onPress={() => setModalVisible(false)}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InfoEditModal;

const styles = StyleSheet.create({});

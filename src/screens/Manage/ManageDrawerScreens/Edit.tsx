import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  Appbar,
  Button,
  Divider,
  Menu,
  TextInput,
  Text,
  HelperText,
  IconButton,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import tw from "twrnc";
import { colors } from "../../../Colors";

const Edit = () => {
  const [text, setText] = React.useState("");
  const [privateMessage, setPrivateMessage] = React.useState("");
  const [emailSubject, setEmailSubject] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [action, setAction] = useState<string>("");
  const [showAccessCode, setShowAccessCode] = useState<boolean>(false);
  const [showPrivateMessage, setShowPrivateMessage] = useState<boolean>(false);
  const [totalRecipient, setTotalRecipient] = useState<number>(1);

  const actionList = [
    {
      label: "Needs to Sign",
      value: "Needs to Sign",
    },
    {
      label: "In Person Signer",
      value: "In Person Signer",
    },
    {
      label: "Receives a Copy",
      value: "Receives a Copy",
    },
    {
      label: "Needs to View",
      value: "Needs to View",
    },
  ];
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  console.log(action);
  return (
    <ScrollView>
      <View style={tw`flex-1 gap-2 p-2 border border-gray-500 m-2 rounded-lg`}>
        <Text variant="headlineSmall">Add Recipient</Text>

        {Array(totalRecipient)
          .fill(0)
          .map((_, index) => (
            <View
              style={tw`flex-1 gap-2 p-2 border border-gray-500 my-2 rounded-lg`}
            >
              <View style={tw`flex-row justify-between items-center`}>
                <Text variant="headlineSmall">Recipient {index + 1}</Text>
                <IconButton
                  icon="close"
                  size={20}
                  onPress={() => console.log("Pressed")}
                />
              </View>

              <DropDown
                label={"Actions"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={action}
                setValue={setAction}
                list={actionList}
              />
              {action === "In Person Signer" ? (
                <>
                  <TextInput
                    mode="outlined"
                    label="Host Name"
                    value={text}
                    onChangeText={(text) => setText(text)}
                  />
                  <TextInput
                    mode="outlined"
                    label="Host Email Address"
                    value={text}
                    onChangeText={(text) => setText(text)}
                  />
                </>
              ) : (
                <TextInput
                  mode="outlined"
                  label="Recipient Name"
                  value={text}
                  onChangeText={(text) => setText(text)}
                />
              )}

              <TextInput
                mode="outlined"
                label="Recipient Email Address"
                value={text}
                onChangeText={(text) => setText(text)}
              />

              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu}>Customize</Button>}
              >
                <Menu.Item
                  onPress={() => {
                    setShowAccessCode(!showAccessCode);
                    closeMenu();
                  }}
                  style={tw`h-16`}
                  title={
                    <View>
                      <Text variant="titleSmall">Enter Access Code</Text>
                      <Text variant="bodySmall">
                        Enter a code that only you and this recipient know.
                      </Text>
                    </View>
                  }
                ></Menu.Item>
                <Divider />
                <Menu.Item
                  onPress={() => {
                    setShowPrivateMessage(!showPrivateMessage);
                    closeMenu();
                  }}
                  style={tw`h-16`}
                  title={
                    <View>
                      <Text variant="titleSmall">Add private message</Text>
                      <Text variant="bodySmall">
                        Include a personal note with this recipient.
                      </Text>
                    </View>
                  }
                />
              </Menu>
              {showAccessCode && (
                // style={tw`flex-1 p-2 border border-gray-500 my-2 rounded-lg`}
                <View>
                  {/* <Text variant="headlineSmall">Enter Access Code</Text> */}

                  <TextInput
                    mode="outlined"
                    label="Access Code"
                    value={text}
                    onChangeText={(text) => setText(text)}
                  />
                  <HelperText type="info">
                    Codes are not case-sensitive. You must provide this code to
                    the signer. This code is available for you to review on the
                    Envelope Details page.
                  </HelperText>
                </View>
              )}
              {showPrivateMessage && (
                <View>
                  <TextInput
                    mode="outlined"
                    label="Private Message"
                    value={privateMessage}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setPrivateMessage(text)}
                  />
                  <HelperText
                    type={1000 - privateMessage.length >= 0 ? "info" : "error"}
                  >
                    Characters remaining: {1000 - privateMessage.length}
                  </HelperText>
                </View>
              )}
            </View>
          ))}

        <Button
          icon="plus"
          onPress={() => {
            setTotalRecipient(totalRecipient + 1);
          }}
        >
          Add Recipient
        </Button>
      </View>
      <View style={tw`flex-1 gap-2 p-2 border border-gray-500 m-2 rounded-lg`}>
        <Text variant="headlineSmall">Add Message</Text>
        <View>
          <TextInput
            mode="outlined"
            label="Email Subject"
            value={emailSubject}
            onChangeText={(text) => setEmailSubject(text)}
          />
          <HelperText type={80 - emailSubject.length >= 0 ? "info" : "error"}>
            Characters remaining: {80 - emailSubject.length}
          </HelperText>
        </View>
        <View>
          <TextInput
            mode="outlined"
            label="Email Message"
            value={emailMessage}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setEmailMessage(text)}
          />
          <HelperText type={1000 - emailMessage.length >= 0 ? "info" : "error"}>
            Characters remaining: {1000 - emailMessage.length}
          </HelperText>
        </View>
      </View>
      <View style={tw`flex-1 gap-2 p-2 border border-gray-500 m-2 rounded-lg`}>
        <Text variant="headlineSmall">Add Documents</Text>
        <View style={tw`bg-white px-8 py-8`}>
          <View
            style={tw` border-2 py-10 rounded-xl border-dashed border-[${colors.blue}] justify-center items-center`}
          >
            <TouchableOpacity style={tw`p-1`} onPress={() => {}}>
              <Image
                style={tw`h-10 w-10 self-center`}
                source={require("../../../assets/Upload.png")}
              />
              <Text style={tw`text-[${colors.blue}] mt-2`}>
                Drop documents here to get started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Edit;

const styles = StyleSheet.create({});

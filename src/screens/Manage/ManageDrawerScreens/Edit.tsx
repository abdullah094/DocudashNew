import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import FormData from "form-data";
import { useCounterStore } from "../../../../MobX/TodoStore";
import {
  EmailBar,
  Envelope,
  GenerateSignature,
  GenerateSignatureDetailsImage,
  RootStackScreenProps,
  UploadDocumentAPI,
  ViewDocument,
} from "../../../../types";
import { useNavigation, useRoute } from "@react-navigation/native";

const Edit = () => {
  const Mobx = useCounterStore();
  const [data, setData] = useState([
    {
      recName: "",
      recEmail: "",
      sign_type: "1",
      hostName: "",
      hostEmail: "",
      access_code: "",
      private_message: "",
      recipients_update_id: "",
      showDropDown: false,
      visible: false,
      showAccessCode: false,
      showPrivateMessage: false,
    },
  ]);
  const [emailSubject, setEmailSubject] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generateSignature, setGenerateSignature] =
    useState<GenerateSignature>();
  const [generateSignatureDetailsImages, setGenerateSignatureDetailsImages] =
    useState<GenerateSignatureDetailsImage[]>([]);
  const route = useRoute();
  const envelope: Envelope = route.params;
  // console.log("data", envelope.id, envelope.signature_id);

  const addNewRecipient = () => {
    setData([
      ...data,
      {
        recName: "",
        recEmail: "",
        sign_type: "1",
        hostName: "",
        hostEmail: "",
        access_code: "",
        private_message: "",
        recipients_update_id: "",
        showDropDown: false,
        visible: false,
        showAccessCode: false,
        showPrivateMessage: false,
      },
    ]);
  };

  const actionList = [
    {
      label: "Needs to Sign",
      value: "1",
    },
    {
      label: "In Person Signer",
      value: "2",
    },
    {
      label: "Receives a Copy",
      value: "3",
    },
    {
      label: "Needs to View",
      value: "4",
    },
  ];
  useEffect(() => {
    if (envelope) {
      axios
        .get(
          "https://docudash.net/api/generate-signature/upload-document/" +
            envelope.uniqid +
            "/" +
            envelope.id,
          {
            headers: {
              Authorization: `Bearer ${Mobx.access_token}`,
            },
          }
        )
        .then((response) => {
          const data: UploadDocumentAPI = response.data;
          if (data.generateSignatureDetails.length > 0) {
            const fixData = data.generateSignatureDetails.map((x) => {
              return {
                ...x,
                recipients_update_id: x.id,
                showDropDown: false,
                visible: false,
                showAccessCode: false,
                showPrivateMessage: false,
              };
            });
            setEmailMessage(fixData[0].emailMessage);
            setEmailSubject(fixData[0].emailSubject);

            const generate: GenerateSignature = {
              signature_id: fixData[0].signature_id,
              uniqid: fixData[0].uniqid,
            };

            setGenerateSignature(generate);
            setData(fixData);
          }

          if (data.generateSignatureDetailsImages.length > 0) {
            setGenerateSignatureDetailsImages(
              data.generateSignatureDetailsImages
            );
          }

          console.log("data", data);
        });
    } else {
      const url = "https://docudash.net/api/generate-signature/create";
      axios
        .post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${Mobx.access_token}`,
            },
          }
        )
        .then((response) => {
          const data: GenerateSignature = response.data;
          setGenerateSignature(data);
          console.log("Data----", data);
        })
        .catch((error) => {
          console.log("Error----", error);
        });

      ("https://docudash.net/api/generate-signature/upload-document/99f8c0a8b4dc1e3987d575bb5052dab8/20");
    }
  }, []);
  const save = () => {
    if (!generateSignature) return;
    setLoading(true);
    let formData = new FormData();
    formData.append("uniqid", generateSignature.uniqid);
    formData.append("signature_id", generateSignature.signature_id);
    data.forEach((item, index) => {
      {
        formData.append(
          "recipients_update_id[" + index + "]",
          item.recipients_update_id
        );
        formData.append("recName[" + index + "]", item.recName);
        formData.append("recEmail[" + index + "]", item.recEmail);
        formData.append("sign_type[" + index + "]", String(item.sign_type));
        formData.append("hostName[" + index + "]", item.hostName);
        formData.append("hostEmail[" + index + "]", item.hostEmail);
        formData.append("access_code[" + index + "]", item.access_code);
        formData.append("private_message[" + index + "]", item.private_message);
      }
    });
    formData.append("emailSubject", emailSubject);
    formData.append("emailMessage", emailMessage);

    images.forEach((image, index) => {
      formData.append("photosID[" + index + "]", "0");
      formData.append("image[]", image, `image${index + 1}.png`);
    });
    let headers = {
      Authorization: `Bearer ${Mobx.access_token}`,
      "Content-Type": "multipart/form-data",
    };
    console.log("formData", JSON.stringify(formData));
    axios
      .post(
        "https://docudash.net/api/generate-signature/upload-document",
        formData,
        { headers }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.status === 200) {
          // navigation.navigate('Home');
          console.log(JSON.stringify(response.data));
        } else {
          console.log(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  console.log(emailMessage);
  return (
    <ScrollView>
      <View style={tw`flex-1 gap-2 p-2 border border-gray-500 m-2 rounded-lg`}>
        <Text variant="headlineSmall">Add Recipient</Text>

        {data.map((recipient, index) => (
          <View
            style={tw`flex-1 gap-2 p-2 border border-gray-500 my-2 rounded-lg`}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <Text variant="headlineSmall">Recipient {index + 1}</Text>
              {index !== 0 && (
                <IconButton
                  icon="close"
                  size={20}
                  onPress={() => setData(data.filter((_, i) => i !== index))}
                />
              )}
            </View>

            <DropDown
              label={"Actions"}
              mode={"outlined"}
              visible={recipient.showDropDown}
              showDropDown={() =>
                setData((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, showDropDown: true } : item
                  )
                )
              }
              onDismiss={() =>
                setData((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, showDropDown: false } : item
                  )
                )
              }
              value={recipient.sign_type}
              setValue={(value) => {
                setData((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, sign_type: value } : item
                  )
                );
              }}
              list={actionList}
            />
            {recipient.sign_type == "2" ? (
              <>
                <TextInput
                  mode="outlined"
                  label="Host Name"
                  value={recipient.hostName}
                  onChangeText={(text) => {
                    setData((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, hostName: text } : item
                      )
                    );
                  }}
                />
                <TextInput
                  mode="outlined"
                  label="Host Email Address"
                  value={recipient.hostEmail}
                  onChangeText={(text) => {
                    setData((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, hostEmail: text } : item
                      )
                    );
                  }}
                />
              </>
            ) : (
              <>
                <TextInput
                  mode="outlined"
                  label="Recipient Name"
                  value={recipient.recName}
                  onChangeText={(text) => {
                    setData((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, recName: text } : item
                      )
                    );
                  }}
                />
                <TextInput
                  mode="outlined"
                  label="Recipient Email Address"
                  value={recipient.recEmail}
                  onChangeText={(text) => {
                    setData((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, recEmail: text } : item
                      )
                    );
                  }}
                />
              </>
            )}

            <Menu
              visible={recipient.visible}
              onDismiss={() => {
                setData((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, visible: false } : item
                  )
                );
              }}
              anchor={
                <Button
                  onPress={() => {
                    setData((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, visible: true } : item
                      )
                    );
                  }}
                >
                  Customize
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setData((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            visible: false,
                            showAccessCode: !item.showAccessCode,
                          }
                        : item
                    )
                  );
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
                  setData((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            visible: false,
                            showPrivateMessage: !item.showPrivateMessage,
                          }
                        : item
                    )
                  );
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
            {recipient.showAccessCode && (
              // style={tw`flex-1 p-2 border border-gray-500 my-2 rounded-lg`}
              <View>
                {/* <Text variant="headlineSmall">Enter Access Code</Text> */}

                <TextInput
                  mode="outlined"
                  label="Access Code"
                  value={recipient.access_code}
                  onChangeText={(text) => {
                    setData((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, access_code: text } : item
                      )
                    );
                  }}
                />
                <HelperText type="info">
                  Codes are not case-sensitive. You must provide this code to
                  the signer. This code is available for you to review on the
                  Envelope Details page.
                </HelperText>
              </View>
            )}
            {recipient.showPrivateMessage && (
              <View>
                <TextInput
                  mode="outlined"
                  label="Private Message"
                  value={recipient.private_message}
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => {
                    setData((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, private_message: text } : item
                      )
                    );
                  }}
                />
                <HelperText
                  type={
                    1000 - recipient.private_message.length >= 0
                      ? "info"
                      : "error"
                  }
                >
                  Characters remaining:{" "}
                  {1000 - recipient.private_message.length}
                </HelperText>
              </View>
            )}
          </View>
        ))}

        <Button
          icon="plus"
          onPress={() => {
            addNewRecipient();
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
      <View style={tw`flex-1  mb-10  justify-end flex-row mx-4`}>
        <Button
          loading={loading}
          style={tw`w-30`}
          contentStyle={tw`flex-row-reverse`}
          mode="outlined"
          icon="arrow-right"
          onPress={save}
        >
          Next
        </Button>
      </View>
    </ScrollView>
  );
};

export default Edit;

const styles = StyleSheet.create({});

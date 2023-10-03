import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, IconButton, Menu, Text, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import DropDown from 'react-native-paper-dropdown';

interface recipient {
  id: number;
  first_name: string;
  email: string;
  showDropDown: boolean;
  time: string;
}

const status = [
  {
    label: 'Needs to sign',
    value: '1',
  },
  {
    label: 'In person signer',
    value: '2',
  },
  {
    label: 'Recieves a copy',
    value: '3',
  },
  {
    label: 'Needs to view',
    value: '4',
  },
];

export default function RequestRecipient() {
  const [numberOfRecipient, setNumberOfRecipient] = useState(0);
  const [recipient, setRecipient] = useState<recipient[]>([]);

  useEffect(() => {
    setRecipient((prev) =>
      [...new Array(numberOfRecipient)].map((x, i) => ({
        id: i,
        first_name: '',
        email: '',
        showDropDown: false,
        time: '1',
      }))
    );
  }, [numberOfRecipient]);

  const Delete = (id) => {
    setRecipient((prev) => prev.filter((x, index) => index != id));
    setNumberOfRecipient(numberOfRecipient - 1);
  };

  return (
    <>
      <View style={tw`mx-2`}>
        <Text variant="labelLarge">Number of Recipients:</Text>
        <TextInput
          mode="outlined"
          value={String(numberOfRecipient)}
          onChangeText={(text) => setNumberOfRecipient(Number(text.replace(/[^0-9]/g, '')))}
        />
      </View>
      <ScrollView nestedScrollEnabled>
        <View style={tw` gap-2`}>
          {recipient?.map((item) => (
            <View style={tw`h-64`} key={item.id}>
              <View style={tw`border-2  border-gray-300 p-4 flex-row flex-1 items-center gap-4`}>
                <Text>{item.id + 1}</Text>
                <View style={tw`gap-2 flex-1`}>
                  <View style={tw`flex-row items-center`}>
                    <Text variant="labelLarge" style={tw`w-15`}>
                      Name:
                    </Text>
                    <TextInput
                      mode="outlined"
                      style={tw`ml-2 flex-1`}
                      // placeholder="Name"
                      value={item.first_name}
                      onChangeText={(text) =>
                        setRecipient((prev) =>
                          prev.map((x) => (x.id == item.id ? { ...x, first_name: text } : x))
                        )
                      }
                    ></TextInput>
                  </View>
                  <View style={tw`flex-row items-center`}>
                    <Text variant="labelLarge" style={tw`w-15`}>
                      Email:
                    </Text>
                    <TextInput
                      mode="outlined"
                      // placeholder="Email"
                      style={tw`ml-2 flex-1`}
                      value={item.email}
                      onChangeText={(text) =>
                        setRecipient((prev) =>
                          prev.map((x) => (x.id == item.id ? { ...x, email: text } : x))
                        )
                      }
                    ></TextInput>
                  </View>
                  <View style={tw`items-center flex-row gap-2`}>
                    <Text variant="labelLarge" style={tw`w-15`}>
                      Action:
                    </Text>
                    <Menu
                      theme={{ roundness: 4 }}
                      onDismiss={() =>
                        setRecipient((prev) =>
                          prev.map((x) => (x.id == item.id ? { ...x, showDropDown: false } : x))
                        )
                      }
                      visible={item.showDropDown}
                      anchorPosition="bottom"
                      //   style={tw`w-full`}
                      anchor={
                        <TouchableOpacity
                          onPress={() =>
                            setRecipient((prev) =>
                              prev.map((x) => (x.id == item.id ? { ...x, showDropDown: true } : x))
                            )
                          }
                          style={tw`flex-row items-center border rounded-lg w-50 border-gray-500`}
                        >
                          <Text variant="bodyMedium" style={tw`flex-1 px-2`}>
                            {status.find((x) => x.value == item.time).label}
                          </Text>
                          <IconButton
                            icon="chevron-down"
                            onPress={() =>
                              setRecipient((prev) =>
                                prev.map((x) =>
                                  x.id == item.id ? { ...x, showDropDown: true } : x
                                )
                              )
                            }
                          />
                        </TouchableOpacity>
                      }
                    >
                      {status.map((stat) => (
                        <>
                          <Menu.Item
                            style={tw`flex-1`}
                            onPress={() => {
                              setRecipient((prev) =>
                                prev.map((x) => (x.id == item.id ? { ...x, time: stat.value } : x))
                              );
                              setRecipient((prev) =>
                                prev.map((x) =>
                                  x.id == item.id ? { ...x, showDropDown: false } : x
                                )
                              );
                            }}
                            title={stat.label}
                          />
                          <Divider />
                        </>
                      ))}
                    </Menu>

                    <View style={tw`w-30`}>
                      <IconButton
                        icon="trash-can"
                        iconColor="red"
                        onPress={() => Delete(item.id)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

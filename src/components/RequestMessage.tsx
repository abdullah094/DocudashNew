import { Pressable, Touchable, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text, Button, Divider, Menu, TextInput, IconButton } from 'react-native-paper';
import tw from 'twrnc';
import { IRequest } from 'src/types/request';

export default function RequestMessage({
  data,
  setData,
}: {
  data: IRequest;
  setData: React.Dispatch<React.SetStateAction<IRequest>>;
}) {
  const [LocationVisible, setLocationVisible] = React.useState(false);
  const openLocationMenu = () => setLocationVisible(true);
  const closeLocationMenu = () => setLocationVisible(false);
  const [text, setText] = React.useState('');
  const [location, setLocation] = React.useState('Home');
  return (
    <>
      <View style={tw`mx-2`}>
        <Text variant="labelLarge">Location</Text>
        <Menu
          theme={{ roundness: 4 }}
          onDismiss={closeLocationMenu}
          visible={LocationVisible}
          anchorPosition="bottom"
          style={tw`w-[90%]`}
          anchor={
            <TouchableOpacity
              onPress={openLocationMenu}
              style={tw`flex-row items-center border rounded-xl border-gray-300`}
            >
              <Text variant="bodyMedium" style={tw`flex-1 px-2`}>
                {location}
              </Text>
              <IconButton icon="chevron-down" onPress={openLocationMenu} />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            style={tw`flex-1`}
            onPress={() => {
              setLocation('Home');
              closeLocationMenu();
            }}
            title="Home"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setLocation('Office');
              closeLocationMenu();
            }}
            title="Office"
          />
        </Menu>
      </View>
      <View style={tw`mx-2`}>
        <Text variant="labelLarge">Message </Text>
        <TextInput
          // label="Message"
          mode="outlined"
          multiline
          numberOfLines={2}
          style={tw`h-32`}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
    </>
  );
}

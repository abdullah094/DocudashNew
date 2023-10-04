import { useNavigation, useRoute } from '@react-navigation/native';
import { Envelope, RootStackScreenProps } from '@type/index';
import { colors } from '@utils/Colors';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';

interface IEnvelopeListItem {
  item: Envelope;
  heading: string;
}

export default function RequestEnvelopeListItem({ item, heading }: IEnvelopeListItem) {
  const navigation = useNavigation<RootStackScreenProps<'Inbox'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Inbox'>['route']>();
  return (
    <View style={tw`flex-row flex-1 p-2 px-5 items-center justify-between h-33`}>
      <View style={tw`gap-2 w-[70%]`}>
        <Text style={tw`font-bold text-4 w-full`} numberOfLines={2}>
          {'Notary Document(Legal Documnet)'}
        </Text>
        <Text style={tw`text-gray-500`}>United States</Text>
        <Text style={tw`font-semibold`}>
          Status: <Text style={tw`font-thin`}>Request</Text>
        </Text>
      </View>
      <Button
        onPress={() => navigation.navigate('RequestDetails', { id: item.id })}
        mode="outlined"
      >
        View
      </Button>
    </View>
  );
}

import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import tw from 'twrnc';
import { Envelope, InboxApiResponse, ManageDrawerScreenProps } from '@types/index';
// import EmailBar from '@components/EmailBar';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '@stores/Slices';
import EnvelopeList from '@components/EnvelopeList';

const Inbox = () => {
  const navigation = useNavigation<ManageDrawerScreenProps<'Inbox'>['navigation']>();
  const route = useRoute<ManageDrawerScreenProps<'Inbox'>['route']>();
  const heading = route.params?.heading || ('Inbox' as string);

  return (
    <View style={tw`flex-1`}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={heading} />
      </Appbar.Header>
      <EnvelopeList heading={heading} />
    </View>
  );
};

export default Inbox;

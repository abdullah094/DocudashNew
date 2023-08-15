import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import tw from 'twrnc';
import { RootStackScreenProps } from '@type/index';
// import EmailBar from '@components/EmailBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectRouteName, setRouteName } from '@stores/Slices';
import EnvelopeList from '@components/EnvelopeList';
import HomeHeader from '@components/HomeHeader';

const Inbox = () => {
  const navigation = useNavigation<RootStackScreenProps<'Inbox'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Inbox'>['route']>();
  const heading = route.params?.heading || ('Inbox' as string);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Change name');
    dispatch(setRouteName('Manage'));
  }, [route]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <HomeHeader heading={heading} />
      <EnvelopeList heading={heading} />
    </SafeAreaView>
  );
};

export default Inbox;

import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';
import { DashBoardDrawerScreenProps } from '../../../types';

const Browser = () => {
  const navigation = useNavigation<DashBoardDrawerScreenProps<'Browser'>['navigation']>();
  const route = useRoute<DashBoardDrawerScreenProps<'Browser'>['route']>();
  return <WebView style={tw`flex-1`} source={{ uri: route.params.url }} />;
};

export default Browser;

const styles = StyleSheet.create({});

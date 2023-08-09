import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';
import { useRoute } from '@react-navigation/native';

const Browser = () => {
  const route = useRoute();
  return <WebView style={tw`flex-1`} source={{ uri: route.params }} />;
};

export default Browser;

const styles = StyleSheet.create({});

import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';
import { RootStackScreenProps } from '@type/index';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import COLORS from '@constants/colors';

const Browser = () => {
  const navigation = useNavigation<RootStackScreenProps<'Browser'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Browser'>['route']>();
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={styles.header}>
        <Icon name="keyboard-backspace" size={28} onPress={navigation.goBack} />
        <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>
          {route.params.heading}
        </Text>
        <View></View>
      </View>
      <WebView style={tw`flex-1`} source={{ uri: route.params.url }} />
    </SafeAreaView>
  );
};

export default Browser;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

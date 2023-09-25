import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from '@type/index';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import tw from 'twrnc';
// import EmailBar from '@components/EmailBar';
import EnvelopeList from '@components/EnvelopeList';
import HomeHeader from '@components/HomeHeader';
import { setRouteName } from '@stores/Slices';
import { useDispatch } from 'react-redux';
import { SegmentedButtons } from 'react-native-paper';
import { View } from 'react-native-ui-lib';

const Inbox = () => {
  const navigation = useNavigation<RootStackScreenProps<'Inbox'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Inbox'>['route']>();
  const heading = route.params?.heading || ('Inbox' as string);
  const [value, setValue] = React.useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Change name');
    dispatch(setRouteName('Manage'));
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <HomeHeader heading={heading} />
      <View style={tw`px-4`}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'inbox',
              label: 'Inbox',
            },
            {
              value: 'draft',
              label: 'Draft',
            },
            { value: 'sent', label: 'Sent' },

            { value: 'trash', label: 'Trash' },
          ]}
        />
      </View>
      <EnvelopeList heading={value} />
    </SafeAreaView>
  );
};

export default Inbox;

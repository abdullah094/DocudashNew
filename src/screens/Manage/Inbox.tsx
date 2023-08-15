import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from '@type/index';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import tw from 'twrnc';
// import EmailBar from '@components/EmailBar';
import EnvelopeList from '@components/EnvelopeList';
import HomeHeader from '@components/HomeHeader';
import { setRouteName } from '@stores/Slices';
import { useDispatch } from 'react-redux';

const Inbox = () => {
  const navigation = useNavigation<RootStackScreenProps<'Inbox'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Inbox'>['route']>();
  const heading = route.params?.heading || ('Inbox' as string);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Change name');
    dispatch(setRouteName('Manage'));
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <HomeHeader heading={heading} />
      <EnvelopeList heading={heading} />
    </SafeAreaView>
  );
};

export default Inbox;

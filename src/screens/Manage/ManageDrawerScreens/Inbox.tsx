import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import tw from 'twrnc';
import { useCounterStore } from '../../../../MobX/TodoStore';
import {
  Envelope,
  InboxApiResponse,
  LoginStackScreenProps,
  ManageDrawerScreenProps,
} from '../../../../types/type';
import EmailBar from '../Components/EmailBar';
import FilterModal from '../Components/FilterModal';

const Inbox = observer(() => {
  const [data, setData] = useState<Array<Envelope>>(new Array(5));
  const [loading, setLoading] = useState(false);
  function filter(name: string | undefined) {
    if (name) {
      const filtered = data.filter((x) => x.emailSubject.includes(name));
      return filtered;
    }
  }

  const [Name, setName] = useState<string | undefined>();
  const navigation = useNavigation<ManageDrawerScreenProps<'Inbox'>['navigation']>();
  const route = useRoute<LoginStackScreenProps<'Inbox'>['route']>();
  const heading = route.params?.heading || ('Inbox' as string);
  const Mobx = useCounterStore();
  const fetchData = async () => {
    setLoading(true);
    const h = heading.toLowerCase();
    const url = 'https://docudash.net/api/generate-signature/';
    console.log(url + h);
    await axios
      .get(url + h, {
        headers: {
          Authorization: `Bearer ${Mobx.access_token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        const data: InboxApiResponse = response.data;
        setData(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error----', error);
        setData([]);
      });
  };

  const Header = () => (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Appbar.Content title={heading} />
    </Appbar.Header>
  );
  useEffect(() => {
    fetchData();
  }, [heading]);
  const onRefresh = () => {
    fetchData();
  };

  return (
    <View style={tw`flex-1`}>
      <Header />

      <FlatList
        data={filter(Name) ? filter(Name) : data}
        ListHeaderComponent={
          <View style={tw`flex-row items-center justify-between px-5 mb-5 `}>
            <Text style={tw`font-bold text-6  tracking-wider`} numberOfLines={1}>
              {heading}
            </Text>
            <FilterModal
              onPress={(item: React.SetStateAction<string | undefined>) => setName(item)}
            />
          </View>
        }
        onRefresh={onRefresh}
        refreshing={loading}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={[tw`pb-25 py-5`, { alignSelf: 'stretch' }]}
        // keyExtractor={(item) => item.id + '_'}
        renderItem={({ item }) => <EmailBar item={item} loading={loading} heading={heading} />}
      />
    </View>
  );
});

export default Inbox;

const styles = StyleSheet.create({});

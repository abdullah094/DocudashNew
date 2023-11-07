import FilterModal from '@components/FilterModal';
import { selectAccessToken } from '@stores/Slices';
import { Envelope, InboxApiResponse } from '@type/index';
import axios from 'axios';
import SkeletonLoader from 'expo-skeleton-loader';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import EnvelopeListItem from './EnvelopeListItem';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import RequestEnvelopeListItem from './RequestEnvelopeListItem';
import { RequestEnvelopeListT } from 'src/types/RequestEnvelope';
export default function RequestEnvelopeList({ heading }: { heading: string }) {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const accessToken = useSelector(selectAccessToken);
  const [data, setData] = useState<Array<RequestEnvelopeListT>>();
  const [loading, setLoading] = useState(false);
  // console.log(accessToken);

  function filter(name: string | undefined) {
    if (name) {
      const filtered = data.filter((x) => x.requestMessage.includes(name));
      return filtered;
    }
  }
  const [Name, setName] = useState<string | undefined>();
  const fetchData = async () => {
    setLoading(true);
    const h = heading;
    const url = 'https://docudash.net/api/notary/';
    console.log(url + h);
    await axios
      .get(url + h, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLoading(false);
        const data: InboxApiResponse = response.data;
        // console.log(data);

        setData(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error----', error);
        setData([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, [heading, focused]);
  const onRefresh = () => {
    fetchData();
  };
  return (
    <FlatList
      data={loading ? new Array(7).fill({}) : filter(Name) ? filter(Name) : data}
      ListHeaderComponent={
        <View style={tw`flex-row items-center justify-between px-5 mb-5 `}>
          <Text style={tw`font-bold text-6  tracking-wider`} numberOfLines={1}>
            {heading.toUpperCase().substring(0, heading.length - 4)}
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
      ListEmptyComponent={
        <View>
          <Text style={tw`text-center text-gray-500`}>
            No {heading.substring(0, heading.length - 4)} items Found
          </Text>
        </View>
      }
      //   keyExtractor={(item) => item.id + '_'}
      renderItem={({ item }) =>
        loading ? <Skeleton /> : <RequestEnvelopeListItem item={item} heading={heading} />
      }
    />
  );
}

const Skeleton = () => {
  return (
    <SkeletonLoader boneColor={'#D3D3D3'}>
      <SkeletonLoader.Container style={tw`my-2`}>
        {/*  @ts-ignore */}
        <SkeletonLoader.Item style={tw`w-80 h-2 self-center mt-5`} />
        <SkeletonLoader.Item style={tw`w-80 h-2 self-center mt-5`} />
        <SkeletonLoader.Item style={tw`w-80 h-2 self-center mt-5`} />
        <SkeletonLoader.Item style={tw`w-80 h-2 self-center mt-5`} />
        <SkeletonLoader.Item style={tw`w-80 h-2 self-center mt-5`} />
      </SkeletonLoader.Container>
    </SkeletonLoader>
  );
};

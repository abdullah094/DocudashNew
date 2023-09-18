import CustomMarker from '@components/CustomMarker';
import PostCarouselItem from '@components/PostCarouselItem';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewabilityConfigCallbackPairs,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FlatListPropsWithLayout } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '@utils/Colors';
const { width, height } = Dimensions.get('window');

const Map = () => {
  const [select, setSelect] = useState(1);
  const navigation = useNavigation();
  const panelRef = useRef(null);
  const [heart, setHeart] = useState<number>();
  const [condition, setCondition] = useState(true);
  const [searchText, setSearchText] = useState<string>();
  // const { posts } = props;
  const posts = [
    {
      id: '0',
      image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
      type: 'Private Room',
      title: 'Bright room in the heart of the city',
      description:
        "Lorem Ipsum is simplyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bed: 2,
      bedroom: 3,
      oldPrice: 25,
      newPrice: 20,
      totalPrice: 120,
      coordinate: {
        latitude: 28.3915637,
        longitude: -16.6291304,
      },
    },
    {
      id: '1',
      image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
      type: 'Entire Flat',
      title: 'NEW lux. apartment in the center of Santa Cruz',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bed: 3,
      bedroom: 2,
      oldPrice: 76,
      newPrice: 65,
      totalPrice: 390,
      coordinate: {
        latitude: 28.4815637,
        longitude: -16.2291304,
      },
    },
    {
      id: '2',
      image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
      type: 'Private Property',
      title: 'Green House Santa Cruz',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bed: 2,
      bedroom: 1,
      oldPrice: 64,
      newPrice: 55,
      totalPrice: 330,
      coordinate: {
        latitude: 28.2515637,
        longitude: -16.3991304,
      },
    },
    {
      id: '3',
      image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg',
      type: 'Entire Flat',
      title: 'Typical canarian house',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bed: 4,
      bedroom: 3,
      oldPrice: 120,
      newPrice: 100,
      totalPrice: 600,
      coordinate: {
        latitude: 28.4815637,
        longitude: -16.2991304,
      },
    },
  ];

  // variables
  const snapPoints = useMemo(() => ['8%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('');

  const flatList = useRef<FlatList>(null);
  const map = useRef<MapView>(null);

  const viewConfig = useRef({
    // minimumViewTime: 500,
    itemVisiblePercentThreshold: 70,
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    console.log('onViewCallBack', viewableItems);
    if (viewableItems.length > 0) {
      const selectedPlace = viewableItems[0].item;
      setSelectedPlaceId(selectedPlace.id);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
    {
      viewabilityConfig: viewConfig.current,
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]);

  const width = useWindowDimensions().width;
  const FlatListData = [
    {
      id: 1,
      name: 'Tropical',
      img: require('@assets/Download.png'),
    },
    {
      id: 2,
      name: 'OMG!',
      img: require('@assets/Download.png'),
    },
    {
      id: 3,
      name: 'Tiny Homes ',
      img: require('@assets/Download.png'),
    },
    {
      id: 4,
      name: 'Lake',
      img: require('@assets/Download.png'),
    },
    {
      id: 5,
      name: 'Mansions',
      img: require('@assets/Download.png'),
    },
  ];
  const coordinates = [
    {
      latitude: 24.910688,
      longitude: 67.0310973,
    },
    {
      latitude: 24.910688,
      longitude: 67.0310973,
    },
  ];
  useEffect(() => {
    if (!selectedPlaceId || !flatList.current) {
      return;
    }
    const index = posts.findIndex((place) => place.id === selectedPlaceId);
    flatList.current.scrollToIndex({ index });

    const selectedPlace = posts[index];
    console.log(selectedPlace);
    const region = {
      latitude: selectedPlace.coordinate.latitude,
      longitude: selectedPlace.coordinate.longitude,
      latitudeDelta: 0.8,
      longitudeDelta: 0.8,
    };
    map.current?.animateToRegion(region);
  }, [selectedPlaceId]);
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginRight: 5,
            }}
          >
            <EvilIcons name={'chevron-left'} size={30} color="black" />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            styles={{
              predefinedPlacesDescription: {
                color: 'blue',
              },
              textInput: {
                height: 38,
                color: colors.black,
                fontSize: 15,
              },
              listView: {
                backgroundColor: colors.green,
              },
            }}
            placeholder="Search for Notary"
            debounce={400}
            GooglePlacesDetailsQuery={{ fields: 'geometry' }}
            fetchDetails={true}
            renderRow={(rowData) => {
              const title = rowData.structured_formatting.main_text;
              const address = rowData.structured_formatting.secondary_text;
              return (
                <View style={{ height: 18 }}>
                  <Text style={{ fontSize: 13, color: colors.black }}>
                    {title} {address}
                  </Text>
                </View>
              );
            }}
            query={{
              key: 'AIzaSyCSEEKrvzM3-vFcLEoOUf256gzLG7tyWWc',
              language: 'en',
              components: 'country:us',
            }}
            onPress={async (data, details = null) => {
              map.current.animateToRegion(
                {
                  latitude: details?.geometry?.location.lat,
                  longitude: details?.geometry?.location.lng,
                  latitudeDelta: 0.95,
                  longitudeDelta: 0.21,
                },
                2500
              );
              // 'details' is provided when fetchDetails = true
            }}
          />
        </View>
        <MapView
          ref={map}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 28.3279822,
            longitude: -16.5124847,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
          }}
        >
          {posts.map((place) => (
            <CustomMarker
              coordinate={{
                latitude: place.coordinate.latitude,
                longitude: place.coordinate.longitude,
              }}
              key={place.id}
              price={place.newPrice}
              isSelected={place.id === selectedPlaceId}
              onPress={() => setSelectedPlaceId(place.id)}
            />
          ))}
        </MapView>
        <View style={{ position: 'absolute', bottom: 30 }}>
          <FlatList
            ref={flatList}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: any) => <PostCarouselItem post={item} key={item.id} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - 60}
            snapToAlignment={'center'}
            decelerationRate={'fast'}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            // viewabilityConfig={viewConfig.current}
            // onViewableItemsChanged={onViewChanged.current}
          />
        </View>
        <BottomSheet
          // animateOnMount={false}
          ref={panelRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          {/* <View style={{flex: 1}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
                fontSize: 18,
              }}>
              {`${posts?.length} Tropical Homes`}
            </Text> */}

          <BottomSheetFlatList
            ListHeaderComponent={
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 20,
                  fontSize: 18,
                }}
              >
                {`${posts?.length} Tropical Homes`}
              </Text>
            }
            data={posts}
            renderItem={({ item }: any) => {
              return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SnappCover')}>
                  <View
                    style={tw`w-full my-5 flex justify-center items-center bg-white shadow-md rounded-lg`}
                  >
                    <Image
                      style={{
                        width: width - 20,
                        height: 370,
                        borderRadius: 20,
                      }}
                      source={{ uri: item?.image }}
                    />
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        paddingHorizontal: 10,
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 15, color: 'black' }}>{item?.title}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                          {item?.totalPrice}{' '}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Image
                          style={{ width: 20, height: 20 }}
                          source={require('@assets/Download.png')}
                        />
                        <Text>4.94</Text>
                      </View>
                    </View>
                    <View style={{ position: 'absolute', top: 20, right: 20 }}>
                      <TouchableOpacity>
                        <Entypo
                          name={heart === item?.id ? 'heart' : 'heart-outlined'}
                          size={20}
                          color={heart === item?.id ? 'red' : 'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
          {/* </View> */}
          {/* </View> */}
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};
export default Map;

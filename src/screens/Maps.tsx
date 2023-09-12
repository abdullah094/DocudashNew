import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import tw from 'twrnc';
import * as Location from 'expo-location';
import { LongLat } from 'src/types/Location';
import MapViewDirections from 'react-native-maps-directions';

const Maps = () => {
  const [location, setLocation] = useState<LongLat | undefined>({
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 37.33233141,
    longitude: -122.0312186,
    speed: 0,
  });

  const location1 = {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 37.33233141,
    longitude: -122.0312186,
    speed: 0,
  };
  const location2 = {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 37.34233141,
    longitude: -122.0412186,
    speed: 0,
  };
  const coord = [location1, location2];
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAS5nWA8pNQgiVb_LAWkOq6GU8F1tfmvDQ';
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location.coords);
    })();
  }, []);
  console.log('Location', location);

  if (location)
    return (
      <View style={tw`h-full`}>
        <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker draggable coordinate={coord[1]} />
          <Marker draggable coordinate={coord[0]} />
          <MapViewDirections
            origin={coord[0]}
            destination={coord[1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        </MapView>
      </View>
    );
};

export default Maps;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    flexGrow: 1,
  },
});

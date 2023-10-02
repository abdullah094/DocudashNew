import React from 'react';
import { View, Text } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

const CustomMarker = (props: {
  coordinate: LatLng;
  name: string;
  onPress: () => void;
  isSelected: boolean;
}) => {
  const { coordinate, name, onPress, isSelected } = props;
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View
        style={{
          backgroundColor: isSelected ? 'black' : 'white',
          padding: 5,
          borderRadius: 20,
          borderColor: 'grey',
          borderWidth: 1,
        }}
      >
        <Text style={{ color: isSelected ? 'white' : 'black', fontWeight: 'bold' }}>{name}</Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;

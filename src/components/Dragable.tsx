import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Draggable from 'react-native-draggable';

const { width, height } = Dimensions.get('screen');
const Dragable = ({ item, index }) => {
  return (
    <Draggable
      key={index}
      x={((Number.parseInt(item?.left) * 100) / width) * 15}
      y={((Number.parseInt(item?.top) * 100) / width) * 15}
      renderColor="red"
      onDragRelease={(event, pg, bounds) => console.log('bounds', event.nativeEvent.pageX)}
    >
      <View style={tw`h-10 w-10 bg-green-300 z-50 `}></View>
    </Draggable>
  );
};

export default Dragable;

const styles = StyleSheet.create({});

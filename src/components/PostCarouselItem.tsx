import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Notaries } from 'src/types/NoraryList';

interface IPost {
  post: Notaries;
}

const PostCarouselItem = ({ post }: IPost) => {
  const width = useWindowDimensions().width;

  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('NotaryProfile', { item: post });
  };
  return (
    // <Text>hello</Text>
    <Pressable
      onPress={goToPostPage}
      style={[tw`h-28 bg-white m-1 rounded-lg`, { width: width - 60, marginBottom: 60 }]}
    >
      <View style={tw`bg-white rounded-lg `}>
        <View style={tw`flex-row`}>
          {/* Image  */}
          <Image
            style={tw`h-30 w-30 m-2 bg-gray-200 rounded-lg`}
            resizeMode="contain"
            source={{ uri: post.notary_image }}
          />

          <View style={{ flex: 1, marginHorizontal: 10 }}>
            {/* Bed & Bedroom  */}
            <Text style={tw`text-lg my-2`}>{post.email}</Text>

            {/* Type & Description */}
            <Text style={tw`text-sm`} numberOfLines={2}>
              {post?.first_name} {post?.last_name}
            </Text>

            {/*  Old price & new price */}
            <Text style={tw`text-sm my-2`}>
              <Text style={tw`font-bold`}>${post.newPrice} </Text>/ sign
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PostCarouselItem;

const styles = StyleSheet.create({});

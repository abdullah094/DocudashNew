import { Image, Pressable, StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Notaries } from 'src/types/NoraryList';
import { Text } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

interface IPost {
  post: Notaries;
}

const PostCarouselItem = ({ post }: IPost) => {
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
            style={tw`h-20 w-20 m-2 bg-gray-200 rounded-lg`}
            resizeMode="contain"
            source={{ uri: post.notary_image }}
          />

          <View style={tw`flex-1 gap-2 p-2`}>
            <Text variant="labelLarge" style={tw`text-lg`} numberOfLines={2}>
              {post?.first_name} {post?.last_name}
            </Text>
            <Text variant="bodyMedium">{post.email}</Text>

            {/*  Old price & new price */}
            {/* <Text style={tw`text-sm my-2`}>
              <Text style={tw`font-bold`}>{post.ShortDescription} </Text>
            </Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PostCarouselItem;

const styles = StyleSheet.create({});

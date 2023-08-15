import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import React, { useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import tw from 'twrnc';
import { DashboardAPI, User } from '@types/index';
import { colors } from '@utils/Colors';
import InfoEditModal from '@components/InfoEditModel';
import NameEditModal from '@components/NameEditModel';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectProfileData, setProfileData } from '@stores/Slices';
import HomeHeader from '@components/HomeHeader';

const Profile = () => {
  const user = useSelector(selectProfileData);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const pickImage = async () => {
    if (loading) return;

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setLoading(true);
    if (!result.canceled) {
      const image = result.assets[0];
      let formData = new FormData();
      const imageToUpload = {
        uri: image.uri,
        name: image.fileName || image.uri,
        type: image.type,
      };

      formData.append('photo', imageToUpload);
      let headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      };
      axios
        .post('https://docudash.net/api/upload-image', formData, { headers })
        .then((response) => {
          setLoading(false);
          const {
            success,
            message,
          }: {
            success: false;
            message: {
              photo: string[];
            };
          } = response.data;
          if (success) {
            // navigation.navigate('Home');
            alert(message);
            fetchDashData();
          } else {
            message.photo.map((x) => alert(x));
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('error', error);
        });
      // setImage(result.assets[0].uri);
    }
  };
  const fetchDashData = () => {
    axios
      .get('https://docudash.net/api/dashboard', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data: DashboardAPI = response.data;
        console.log('DashboardAPI', data);
        dispatch(setProfileData(data.user));
        onRefresh();
      });
  };
  return (
    <SafeAreaView style={tw`flex-1`}>
      <HomeHeader heading={'PROFILE'} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={tw`m-4 gap-1 `}>
          <Text style={tw`text-black text-5 font-bold `}>Profile</Text>
          <Text style={tw`text-[${colors.gray}] text-3`}>
            Manage your personal profile information to control what details are shared with other
            Docudash users.
          </Text>
        </View>
        <View style={tw`border border-gray-300 m-4 p-4 rounded-lg `}>
          <View style={tw`flex-row justify-between`}>
            <Text variant="titleMedium">Profile Image</Text>
            <Button mode="contained" style={tw`rounded-lg`} onPress={pickImage}>
              Update
            </Button>
          </View>

          <Avatar.Image size={60} style={tw`m-2`} source={{ uri: user.profile_photo }} />
        </View>
        <View style={tw`border border-gray-300 m-4 p-4 rounded-lg `}>
          <View style={tw`flex-row justify-between`}>
            <Text variant="titleMedium">Name</Text>
            <NameEditModal />
          </View>
          <Text>
            {user.first_name} {user.last_name}
          </Text>
        </View>
        <View style={tw`border border-gray-300 m-4 p-4 rounded-lg `}>
          <View style={tw`flex-row justify-between`}>
            <Text variant="titleMedium">Email address</Text>
            <Button
              mode="contained"
              style={tw`rounded-lg`}
              onPress={() => {
                alert('You Cannot Change Your Email');
              }}
            >
              Update
            </Button>
          </View>
          <Text>{user.email}</Text>
        </View>
        <View style={tw`border border-gray-300 m-4 p-4 rounded-lg `}>
          <View style={tw`flex-row justify-between`}>
            <Text variant="titleMedium">Contact Information</Text>
            <InfoEditModal />
          </View>
          <View style={tw`gap-2`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <Text variant="titleSmall">Phone:</Text>
              <Text>{user.phone}</Text>
            </View>
            <View style={tw`flex-row gap-2 items-center`}>
              <Text>Company:</Text>
              <Text>{user.company}</Text>
            </View>
            <View style={tw`flex-row gap-2 items-center`}>
              <Text>Address:</Text>
              <Text>{user.address1}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

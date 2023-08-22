import GettingStarted from '@components/GettingStarted';
import HomeHeader from '@components/HomeHeader';
import UploadView from '@components/UploadView';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { selectAccessToken, setProfileData, setRouteName } from '@stores/Slices';
import { DashboardAPI, HomeDrawerScreenProps, User } from '@type/index';
import { colors } from '@utils/Colors';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import COLORS from '../constants/colors';
import mime from 'mime';
const { height } = Dimensions.get('window');

interface uploadType {
  uri: string;
  name: string;
  type: 'image' | 'video' | undefined | string;
}
const HomeScreen = () => {
  const navigation = useNavigation<HomeDrawerScreenProps<'HomeScreen'>['navigation']>();
  const route = useRoute<HomeDrawerScreenProps<'HomeScreen'>['route']>();
  const [documents, setDocuments] = useState<uploadType[]>(new Array());
  const dispatch = useDispatch();
  const [dashNumber, setDashNumber] = useState({
    actionRequired: 0,
    waitingForOthers: 0,
    expiringSoon: 0,
    completed: 0,
  });
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState<any>();
  const accessToken = useSelector(selectAccessToken);

  const fetchDashData = () => {
    axios
      .get('https://docudash.net/api/dashboard', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data: DashboardAPI = response.data;
        // console.log('DashboardAPI', data);
        setDashNumber({
          ...dashNumber,
          waitingForOthers: data.WaitingForOthers,
          completed: data.CompletedEmails,
        });
        dispatch(setProfileData(data.user));
        setUserData(data.user);
        if (data.signature?.signature) {
          setSignature(data.signature);
        } else {
          setSignature('');
        }
      });
  };
  const Box = ({ text, num }: { text: string; num: number }) => {
    return (
      <View style={tw`border-2 border-white p-2  rounded-lg w-[40%] h-22`}>
        <Text style={tw`text-10 text-white`}>{num}</Text>
        <Text style={tw`text-white text-4`} numberOfLines={1}>
          {text}
        </Text>
      </View>
    );
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    setDocuments(new Array());
    fetchDashData();
    console.log('Change name Home', isFocused);
    dispatch(setRouteName('Home'));
  }, [navigation, isFocused]);

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
      var imageToUpload = {
        uri: '',
        name: '',
        type: '',
      };
      let formData = new FormData();
      if (Platform.OS === 'android') {
        const newImageUri = 'file:///' + image.uri.split('file:/').join('');
        imageToUpload = {
          uri: newImageUri,
          name: image.fileName ?? image.uri.split('/').pop(),
          type: mime.getType(newImageUri),
        };
      } else {
        imageToUpload = {
          uri: image.uri,
          name: image.fileName ?? image.uri.split('/').pop(),
          type: image.type,
        };
      }

      // @ts-ignore
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
            // @ts-ignore
            Alert.alert(message);
            fetchDashData();
          } else {
            if (message.photo) {
              message.photo.map((x) => Alert.alert(x));
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('error', error);
        });
      // setImage(result.assets[0].uri);
    } else {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HomeHeader heading={'DASHBOARD'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          <GettingStarted />
          <View style={tw`-mx-5 items-center mt-10 bg-[${colors.green}] py-10 gap-2`}>
            <View style={tw`flex-row items-center h-25`}>
              {loading ? (
                <ActivityIndicator size={100} animating={true} />
              ) : (
                <TouchableOpacity onPress={pickImage}>
                  <Avatar.Image
                    size={100}
                    style={tw`m-2`}
                    source={{ uri: userData?.profile_photo }}
                  />
                </TouchableOpacity>
              )}

              <Image
                style={tw`w-2.1 h-24 rounded-full mt-5 top--2 mx-2`}
                source={require('@assets/WhiteLine.png')}
              />
              <View style={tw`h-full flex-1 justify-between items-start px-1 `}>
                <Text style={tw`font-semibold text-white text-4 w-50`}>Signed by:</Text>

                {signature ? (
                  <>
                    <Image
                      style={[tw`h-12 w-full`, { tintColor: 'white' }]}
                      source={{
                        uri: signature?.signature.replace(/(\r\n|\n|\r)/gm, ''),
                      }}
                      resizeMode="contain"
                    />

                    <Text style={tw`text-white text-4 w-50`}>{signature.signature_code}</Text>
                  </>
                ) : (
                  <>
                    <Text style={tw`text-white text-4 w-50`}>Needs to sign</Text>
                    <Text style={tw`text-white text-4 w-50`}>
                      Sign id will generate after signature
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View
              style={tw`flex-row  p-4 bg-[${colors.green}] flex-wrap justify-center items-center gap-6`}
            >
              <Box text={'Action Required'} num={0} />
              <Box text={'Waiting for Others'} num={dashNumber.waitingForOthers} />
              <Box text={'Expiring Soon'} num={0} />
              <Box text={'Completed'} num={dashNumber.completed} />
            </View>
          </View>

          <UploadView documents={documents} setDocuments={setDocuments} />
          {[...documents].length > 0 ? (
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Edit', { files: documents })}
            >
              Start Now
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardDetailsContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    padding: 20,
    justifyContent: 'center',
    // borderRadius: 18,
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
export default HomeScreen;

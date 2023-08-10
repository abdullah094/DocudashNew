import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import COLORS from '../constants/colors';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import pets from '../constants/pets';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');
import { LogBox } from 'react-native';
import { HomeDrawerScreenProps, RootStackScreenProps, pet, User, DashboardAPI } from '@types/index';
import { ActivityIndicator, Button, Checkbox } from 'react-native-paper';
import axios from 'axios';
import { selectAccessToken, setProfileData } from '@stores/Slices';
import { useDispatch, useSelector } from 'react-redux';
import GettingStarted from '@components/GettingStarted';
import tw from 'twrnc';
import { colors } from '@utils/Colors';

const HomeScreen = () => {
  const navigation = useNavigation<HomeDrawerScreenProps<'HomeScreen'>['navigation']>();
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
        console.log('DashboardAPI', data);
        setDashNumber({
          ...dashNumber,
          waitingForOthers: data.WaitingForOthers,
          completed: data.CompletedEmails,
        });
        dispatch(setProfileData(data.user));
        setUserData(data.user);
        setLoading(false);
        if (data.signature?.signature) {
          setSignature(data.signature);
        } else {
          setSignature('');
        }
      });
  };

  useEffect(() => {
    fetchDashData();
  }, [navigation]);

  const [checked, setChecked] = React.useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>JANE GARY</Text>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          }}
          style={{ height: 30, width: 30, borderRadius: 25 }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          <GettingStarted />
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

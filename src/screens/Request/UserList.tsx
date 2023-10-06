import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import tw from 'twrnc';
import HomeHeader from '@components/HomeHeader';
import UserRequestList from '@components/UserRequestList';

const UserList = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <HomeHeader heading={'Requests'} />
      <UserRequestList />
    </SafeAreaView>
  );
};

export default UserList;

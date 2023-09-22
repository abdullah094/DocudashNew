import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: string) => {
  //store step data
  try {
    await AsyncStorage.setItem('@loggedIn', value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  let val = await AsyncStorage.getItem('@loggedIn');

  return val;
};

export const storeNotaryOrUser = async (value: string) => {
  //store step data
  try {
    await AsyncStorage.setItem('@notayOrNot', value);
  } catch (e) {
    console.log(e);
  }
};

export const getNotaryOrUser = async () => {
  let val = await AsyncStorage.getItem('notayOrNot');
  return val;
};

export const storeTokenGlobal = async (value: string) => {
  //token for full app
  try {
    await AsyncStorage.setItem('@token_global', value);
  } catch (e) {
    console.log(e);
  }
};
export const clearToken = async () => {
  //store step data
  try {
    await AsyncStorage.setItem('@token_global', '');
  } catch (e) {
    console.log(e);
  }
};
export const getTokenGlobal = async () => {
  let val = await AsyncStorage.getItem('@token_global');
  if (val == null) val = '';
  return val;
};

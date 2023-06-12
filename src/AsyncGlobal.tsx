import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: string) => {
  //store step data
  try {
    await AsyncStorage.setItem("@loggedIn", value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  let val = await AsyncStorage.getItem("@loggedIn");

  return val;
};

export const storeTokenGlobal = async (value: string) => {
  //store step data
  try {
    await AsyncStorage.setItem("@token_global", value);
  } catch (e) {
    console.log(e);
  }
};
export const getTokenGlobal = async () => {
  let val = await AsyncStorage.getItem("@token_global");
  if (val == null) val = "";
  return val;
};

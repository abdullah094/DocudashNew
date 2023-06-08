import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: string) => {
  //store step data
  try {
    await AsyncStorage.setItem("@signup_steps", value);
  } catch (e) {
    console.log(e);
  }
};

export const getvalue = async () => {
  let step: string | null = "Step1";
  try {
    step = await AsyncStorage.getItem("@signup_steps");
  } catch (e) {}

  return step;
};

export const getData = async () => {
  let val = await AsyncStorage.getItem("@signup_steps");

  return val;
};

export const clearAsync = async () => {
  //store step data
  try {
    await AsyncStorage.setItem("@signup_steps", "");
    await AsyncStorage.setItem("@token", "value");
  } catch (e) {
    console.log(e);
  }
};

export const storeToken = async (value: string) => {
  //store step data
  try {
    await AsyncStorage.setItem("@token", value);
  } catch (e) {
    console.log(e);
  }
};
export const getToken = async () => {
  let val = await AsyncStorage.getItem("@token");
  if (val == null) val = "";
  return val;
};

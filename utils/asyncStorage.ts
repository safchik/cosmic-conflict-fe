import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

// For reference only
// Storing the username
export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.log(e);
  }
};

// Retrieving the user
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
  } catch (e) {
    console.log(e);
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";

// Storing the username
export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.log(e);
  }
};

// Retrieving the user
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      return JSON.parse(user);
    }
  } catch (e) {
    console.log(e);
  }
};

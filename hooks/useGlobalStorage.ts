import { useState, useEffect } from "react";
import { getAsyncStorage, setAsyncStorage } from "../utils/asyncStorage";

// Synchronises AsyncStorage with state, then returns the state value
function useGlobalStorage(key) {
  const [value, setValue] = useState(undefined);

  // Set 'value' state to item read from storage
  const readItemFromStorage = async () => {
    const item = await getAsyncStorage(key);
    setValue(item);
  };

  // Update item in storage to newValue
  const writeItemToStorage = async (newValue) => {
    await setAsyncStorage(key, newValue);
    setValue(newValue);
  };

  useEffect(() => {
    // sets new value in state
    readItemFromStorage();
    console.log(value);
  }, [value]);

  return { value, writeItemToStorage };
}

export default useGlobalStorage;

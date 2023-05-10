import { useState, useEffect } from 'react';
import { getAsyncStorage, setAsyncStorage } from '../utils/asyncStorage';

/** useGlobalStorage
 * Synchronises AsyncStorage with state, then returns the state value and a state updater function
 
 * readItemFromStorage - Pulls from AsyncStorage into a local state variable (value)
 * writeItemToStorage - Writes a value to AsyncStorage then updates the local state variable (value)
 
 * Using useGlobalStorage:
  - NOTE: rename `value` & `setValue` like so:
    
    const { value: user, setValue: setUser ] = useGlobalStorage('user')

 * The util functions imported at top of file are responsible for serializing the data passed to the AsyncStorage
 * i.e. parsing the value as a JSON string when storing it, then parsing it back to JS when reading from it
 */
function useGlobalStorage(key) {
  const [value, setValue] = useState({ undefined });

  // Set 'value' state to item read from storage
  const readItemFromStorage = async () => {
    const item = await getAsyncStorage(key);
    setValue(item);
  };

  // Update item in storage and the 'value' state to newValue
  const writeItemToStorage = async (newValue) => {
    await setAsyncStorage(key, newValue);
    setValue(newValue);
  };

  useEffect(() => {
    // Reads from AsyncStorage on mount, then sets new value in state
    readItemFromStorage();
  }, []);

  return { value, setValue: writeItemToStorage };
}

export default useGlobalStorage;

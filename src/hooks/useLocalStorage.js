// Custom hook to control local storage

import { useState } from "react";

// When useLocalStorage is called
// it returns the storedValue along with a function
// (setStoredValue) to change it. On the first call
// the storeValue is null and seValue replaces the null
// value with the value passed to it
// (in this case token sent from server)
// at the same time the value in local storage is updated
// So the next call returns the updated value
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    // Retrun storedValue
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

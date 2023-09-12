import { useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const [storedValue, setStoredValue] = useState(() => {
    if (isLocalStorageAvailable) {
      const item = window.localStorage.getItem(key) || "";
      return item ? JSON.parse(item) : initialValue;
    } else {
      return initialValue;
    }
  });

  // Update the localStorage value when the state changes
  const setValue = (value: string | Function) => {
    if (isLocalStorageAvailable) {
      const newValue = typeof value === "function" ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    }
  };

  // Remove the key from localStorage and reset the state
  const removeValue = () => {
    if (isLocalStorageAvailable) {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    }
  };

  return [storedValue, setValue, removeValue];
}

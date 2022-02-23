import { useState } from 'react';

/** Sync state to local storage so that it persists through a page refresh. */
export function useLocalStorage<T>(key: string, initialValue: T): [T, ((value: T) => void)] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error: unknown) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  /** Value setter function. */
  const setValue = (value: T): void => {
    try {
      // Save state
      setStoredValue(value);

      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error: unknown) {
      // A more advanced implementation would handle the error case
    }
  };
  return [storedValue, setValue];
}

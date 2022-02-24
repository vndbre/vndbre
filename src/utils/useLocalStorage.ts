import { useState } from 'react';

/**
 * Sync state to local storage so that it persists through a page refresh.
 * @param key Local store key.
 * @param initialValue Initial value, returned on errors.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, ((value: T) => void)] {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  /**
   * Local storage value setter.
   * @param value Value.
   */
  const setValue = (value: T): void => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
}

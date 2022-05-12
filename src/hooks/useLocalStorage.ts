import { useState } from 'react';
import { LocalStorageService } from '../api/services/localStorageService';

/**
 * Syncs the component state to the local storage so that it persists through the page refresh.
 * @param key Local storage key.
 * @param initialValue Initial value.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, ((value: T) => void)] {
  const [storedValue, setStoredValue] = useState<T>(LocalStorageService.get<T>(key) ?? initialValue);

  /**
   * Sets a new state value and syncs it with the local storage.
   * @param value Value.
   */
  const setValue = (value: T): void => {
    setStoredValue(value);
    LocalStorageService.save(key, value);
  };

  return [storedValue, setValue];
}

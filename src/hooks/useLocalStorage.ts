import { useCallback, useState } from 'react';
import { LocalStorageService } from '../api/services/localStorageService';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type UseLocalStorageReturnType<T> = { readonly value: T; readonly setValue: ((value: T) => void); removeValue: ((value: T) => void); };

/**
 * Syncs the state to the local storage so that it persists through the page refresh.
 * @param key Local storage key.
 * @param initialValue Initial value.
 */
export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(LocalStorageService.get<T>(key) ?? initialValue);

  /**
   * Sets a new state value and syncs it with the local storage.
   * @param value Value.
   */
  const setValue = useCallback((value: T) => {
    setStoredValue(value);
    LocalStorageService.save(key, value);
  }, []);

  /**
   * Sets a new state value, but removes the state from the local storage.
   * @param value Value.
   */
  const removeValue = useCallback((value: T) => {
    setStoredValue(value);
    LocalStorageService.remove(key);
  }, []);

  return { value: storedValue, setValue, removeValue };
}

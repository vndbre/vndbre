import { useEffect, useState } from 'react';

/**
 * Debounces given value.
 * @param value Value.
 * @param delay Delay.
 */
export const useDebounce = <T>(value: T, delay = 250): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

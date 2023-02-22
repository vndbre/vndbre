import { useCallback, useState } from 'react';

/**
 * Wrapper hook on top of `useState` to work ease work with boolean value;.
 * @param initialValue Initial value.
 * @returns Array with: `[value, toggleFunction, customValueSetter]`.
 */
export const useToggle = (
  initialValue = false,
): [boolean, () => void, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  const setCustomValue = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setCustomValue];
};

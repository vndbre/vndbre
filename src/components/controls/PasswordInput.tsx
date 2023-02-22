import { useState, useMemo, useCallback } from 'react';
import { useController } from 'react-hook-form';
import type { FormControlProps } from 'src/utils/FormControlProps';
import type { FieldValues } from 'react-hook-form';
import type { StrictOmit } from 'src/api/utils/strictOmit';
import { typedMemo } from 'src/api/utils/typedMemo';
import { IconButton } from '../IconButton/IconButton';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

type Props<T extends FieldValues> = StrictOmit<InputProps, 'name'> & FormControlProps<T>;

/** Password input. */
const PasswordInputComponent = <T extends FieldValues>({
  id,
  control,
  name,
  placeholder,
  isDisabled,
  isInvalid,
  ...props
}: Props<T>): JSX.Element => {
  const {
    field: { onChange, value, ref },
  } = useController({
    name,
    control,
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordHidden(prev => !prev);
  }, []);

  const toggleButton = useMemo(() => {
    if (value.length === 0) {
      return null;
    }

    return (
      <IconButton
        intent="quaternary"
        size="xs"
        name={isPasswordHidden ? 'view' : 'view-off'}
        ariaLabel={isPasswordHidden ? 'Show password' : 'Hide password'}
        onClick={togglePasswordVisibility}
      />
    );
  },
  [isPasswordHidden, value.length > 0]);

  return (
    <Input
      {...props}
      id={id}
      type={isPasswordHidden ? 'password' : 'text'}
      name={name}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      rightElement={toggleButton}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
    />
  );
};

export const PasswordInput = typedMemo(PasswordInputComponent);

import type { FC } from 'react';
import React, { useState, useMemo, memo, useCallback } from 'react';

import { useController } from 'react-hook-form';
import type { FormControlProps } from 'src/utils/FormControlProps';
import { IconButton } from '../IconButton/IconButton';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

type Props = InputProps & FormControlProps;

/** Password input. */
const PasswordInputComponent: FC<Props> = ({
  id,
  control,
  name,
  placeholder,
  isDisabled,
  isInvalid,
}) => {
  const {
    field: { onChange, value, ref },
  } = useController<Record<string, string>>({
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

export const PasswordInput = memo(PasswordInputComponent);

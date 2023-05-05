'use client';

import type { FC, ForwardedRef } from 'react';
import React, { memo, forwardRef, useMemo, useCallback } from 'react';

import { IconButton } from '../IconButton/IconButton';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

type Props = InputProps & {
  readonly onChange?: (value: string) => void;
  readonly value?: string;
};

/**
 * Text input.
 * @param ref Forwarded ref.
 */
const TextInputComponent: FC<Props> = ({
  id,
  name,
  placeholder,
  isDisabled,
  isInvalid,
  onChange,
  value,
  ...rest
}, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const clearInput = useCallback(() => {
    if (onChange) {
      onChange('');
    }
  }, [onChange]);
  const isClearButtonShown = value ? value.length > 0 : false;
  const clearButton = useMemo(() => (
    <div>
      {isClearButtonShown && <IconButton name="close" intent="quaternary" size="2xs" iconSize="sm" onClick={clearInput} aria-label="Clear input" />}
    </div>
  ), [isClearButtonShown]);

  return (
    <Input
      id={id}
      name={name}
      value={value}
      ref={ref}
      placeholder={placeholder}
      rightElement={clearButton}
      onChange={onChange}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      {...rest}
    />
  );
};

export const TextInput = memo(forwardRef(TextInputComponent));

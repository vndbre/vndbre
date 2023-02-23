import React, { useMemo, useCallback } from 'react';
import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { FormControlProps } from 'src/utils/FormControlProps';
import type { StrictOmit } from 'src/api/utils/strictOmit';
import { typedMemo } from 'src/api/utils/typedMemo';
import { IconButton } from '../IconButton/IconButton';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

type Props<T extends FieldValues> = StrictOmit<InputProps, 'name'> & FormControlProps<T>;

/** Text input. */
const TextInputComponent = <T extends FieldValues>({
  id,
  control,
  name,
  placeholder,
  rules,
  ...rest
}: Props<T>): JSX.Element => {
  const {
    field: { onChange, value, ref },
  } = useController({
    name,
    control,
    rules,
  });
  const clearInput = useCallback(() => onChange(''), []);
  const isClearButtonShown = value.length > 0;
  const clearButton = useMemo(() => {
    if (isClearButtonShown === false) {
      return null;
    }

    return <IconButton name="close" intent="quaternary" size="2xs" iconSize="sm" onClick={clearInput} ariaLabel="Clear input" />;
  }, [isClearButtonShown]);

  return (
    <Input
      {...rest}
      id={id}
      name={name}
      value={value}
      ref={ref}
      placeholder={placeholder}
      rightElement={clearButton}
      onChange={onChange}
    />
  );
};

export const TextInput = typedMemo(TextInputComponent);

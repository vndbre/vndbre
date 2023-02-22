import type { FC } from 'react';
import React, { useMemo, memo, useCallback } from 'react';
import { useController } from 'react-hook-form';
import type { FormControlProps } from 'src/utils/FormControlProps';
import { IconButton } from '../IconButton/IconButton';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

type Props = InputProps & FormControlProps;

/** Text input. */
const TextInputComponent: FC<Props> = ({
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
  const clearInput = useCallback(() => onChange(''), []);
  const isClearButtonShown = value.length > 0;
  const clearButton = useMemo(() => {
    if (isClearButtonShown === false) {
      return null;
    }

    return <IconButton name="close" intent="quaternary" size="xs" onClick={clearInput} ariaLabel="Clear input" />;
  }, [isClearButtonShown]);

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
    />
  );
};

export const TextInput = memo(TextInputComponent);

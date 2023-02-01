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
  rules,
  ...rest
}) => {
  const {
    field: { onChange, value, ref },
  } = useController<Record<string, string>>({
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

    return <IconButton name="close" intent="quaternary" size="xs" onClick={clearInput} ariaLabel="Clear input" />;
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

export const TextInput = memo(TextInputComponent);

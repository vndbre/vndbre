import React, { memo, ReactNode, useCallback, VFC } from 'react';
import {
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FormControlProps } from '../../utils/formControl';

interface Props extends FormControlProps {

  /** Label for the text input. */
  readonly label?: string;

  /** The element that will be placed on the left side of the input. */
  readonly leftElement?: ReactNode;
}

/**
 * Custom text input based on Chakra UI Input component.
 */
const TextInputComponent: VFC<Props> = ({
  control,
  name,
  label,
  leftElement,
  rules,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, error },
  } = useController<Record<string, string>>({
    name,
    control,
    rules,
  });

  const isCloseButtonShown = value.length > 0;

  const clearInput = useCallback(() => onChange(''), []);

  return (
    <FormControl isInvalid={invalid} id={name}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {leftElement && (
          <InputLeftElement>
            {leftElement}
          </InputLeftElement>
        )}
        <Input
          type="text"
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
        />
        <InputRightElement>
          {isCloseButtonShown && <CloseButton onClick={clearInput} />}
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const TextInput = memo(TextInputComponent);

import React, { VFC, memo, ReactNode, useCallback } from 'react';
import { FormControl, FormErrorMessage, RadioGroup as ChakraRadioGroup, VStack } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FormControlProps } from '../../utils/formControl';

interface Props extends FormControlProps {

  /** Radio button props. */
  readonly children: ReactNode;
}

/** Radio group component. */
const RadioGroupComponent: VFC<Props> = ({ children, control, name, rules }) => {
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController<Record<string, string | number>>({ name, control, rules });

  /** Handles changes depending on value type. */
  const handleChange = useCallback((newValue: string) => {
    if (typeof value === 'number') {
      onChange(Number(newValue));
    } else {
      onChange(newValue);
    }
  }, [onChange, value]);

  return (
    <FormControl isInvalid={invalid} id={name}>
      <ChakraRadioGroup
        name={name}
        colorScheme="orange"
        value={value}
        onChange={handleChange}
      >
        <VStack align="start" spacing="3">
          {children}
        </VStack>
      </ChakraRadioGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const RadioGroup = memo(RadioGroupComponent);

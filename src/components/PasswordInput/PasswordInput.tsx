import React, { memo, useCallback, useState, VFC } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FormControlProps } from '../../utils/formControl';
import { Icon } from '../Icon/Icon';

interface Props extends FormControlProps {

  /** Label for the password input. */
  readonly label?: string;
}

/** Password input. */
const PasswordInputComponent: VFC<Props> = ({
  control,
  name,
  label,
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

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordHidden(prev => !prev);
  }, []);

  return (
    <FormControl isInvalid={invalid} id={name}>
      {label != null && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          type={isPasswordHidden ? 'password' : 'text'}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
        />
        <InputRightElement>
          {value.length > 0 && (
            <IconButton
              aria-label={isPasswordHidden ? 'Show password' : 'Hide password'}
              colorScheme="gray"
              height="32px"
              width="32px"
              minWidth="initial"
              icon={isPasswordHidden ? <Icon name="carbon:view-off" /> : <Icon name="carbon:view" />}
              onClick={togglePasswordVisibility}
            />
          )}
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const PasswordInput = memo(PasswordInputComponent);

import React, { memo, useMemo, VFC } from 'react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useController } from 'react-hook-form';
import { SelectOption } from '../../utils/selectOption';
import { MultiSelect as MultiSelectBase } from './base';

type Props = MultiSelectBase.Props;

/** Multi select. */
const MultiSelectComponent: VFC<Props> = ({
  control,
  name,
  label,
  rules,
  components,
  chakraStyles,
  displayLimit = 0,
  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController<Record<string, SelectOption[]>>({
    name,
    control,
    rules,
  });

  const multiSelectComponents = useMemo(() => MultiSelectBase.getComponents(displayLimit, components), [displayLimit, components]);

  return (
    <FormControl isInvalid={invalid} id={name}>
      <FormLabel>{label}</FormLabel>
      <Select
        isMulti
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        selectedOptionStyle="check"
        hideSelectedOptions={false}
        components={multiSelectComponents}
        chakraStyles={{ ...MultiSelectBase.customChakraStyles, ...chakraStyles }}
        {...props}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const MultiSelect = memo(MultiSelectComponent);

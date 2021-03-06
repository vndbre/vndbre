import React, { memo, useMemo, VFC } from 'react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Select as ReactSelect } from 'chakra-react-select';
import { useController } from 'react-hook-form';
import { SelectOption } from '../../utils/selectOption';
import { Select } from './base';

type Props = Select.Multi.Props;

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

  const multiSelectComponents = useMemo(() => Select.Multi.getComponents(displayLimit, components), [displayLimit, components]);

  return (
    <FormControl isInvalid={invalid} id={name}>
      <FormLabel>{label}</FormLabel>
      <ReactSelect
        isMulti
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        selectedOptionStyle="check"
        hideSelectedOptions={false}
        components={multiSelectComponents}
        chakraStyles={{ ...Select.Multi.customChakraStyles, ...chakraStyles }}
        {...props}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const MultiSelect = memo(MultiSelectComponent);

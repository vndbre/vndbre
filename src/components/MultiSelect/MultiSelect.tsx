import React, { memo, VFC } from 'react';
import { FormControl, FormLabel, FormErrorMessage, CSSObject } from '@chakra-ui/react';
import { Select, Props as SelectProps, GroupBase } from 'chakra-react-select';
import { useController } from 'react-hook-form';
import { SelectOption } from '../../theme/components/Select';
import { FormControlProps } from '../../utils/formControl';

interface Props extends FormControlProps, Omit<SelectProps<SelectOption, true, GroupBase<SelectOption>>, 'name'> {

  /** Label for the multi select. */
  readonly label: string;
}

/**
 * Custom multi select based on Select component from `chakra-react-select`.
 */
const MultiSelectComponent: VFC<Props> = ({ control, name, label, rules, components, chakraStyles, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController<Record<string, SelectOption[]>>({
    name,
    control,
    rules,
  });

  const customComponents = {

    /** Removes default dropdown indicator. */
    DropdownIndicator: () => null,

    /** Removes default indicator separator. */
    IndicatorSeparator: () => null,
  };

  const customChakraStyles = {

    /** Sets styles for tag components inside multi select. */
    multiValue: (provided: CSSObject) => ({
      ...provided,
      background: 'gray.200',
      borderRadius: 'base',
    }),
  };

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
        components={{ ...customComponents, ...components }}
        chakraStyles={{ ...customChakraStyles, ...chakraStyles }}
        {...props}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const MultiSelect = memo(MultiSelectComponent);

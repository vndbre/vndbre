import React, { memo, useMemo, VFC } from 'react';
import { FormControl, FormLabel, FormErrorMessage, CSSObject, Text } from '@chakra-ui/react';
import {
  Select,
  Props as SelectProps,
  GroupBase,
  OptionProps,
  chakraComponents,
  MultiValueGenericProps,
} from 'chakra-react-select';
import { useController } from 'react-hook-form';
import { FormControlProps } from '../../utils/formControl';
import { Icon } from '../Icon/Icon';
import { SelectOption } from '../../utils/selectOption';

interface Props extends FormControlProps, Omit<SelectProps<SelectOption, true, GroupBase<SelectOption>>, 'name'> {

  /** Label for the multi select. */
  readonly label: string;

  /**
   * The maximum number of selected items to be displayed after which overflow would be applied to the remaining elements.
   *
   * If `displayLimit` equals to 0 (which is default value), no overflow would be applied.
   */
  readonly displayLimit?: number;
}

const customMultiSelectChakraStyles = {

  /** Sets styles for tag components inside multi select. */
  multiValue: (provided: CSSObject) => ({
    ...provided,
    background: 'gray.200',
    borderRadius: 'base',
  }),
};

/**
 * Custom multi select based on `Select` component from `chakra-react-select`.
 */
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

  const multiSelectComponents = useMemo(() => ({

    /** Removes default dropdown indicator. */
    DropdownIndicator: () => null,

    /** Removes default indicator separator. */
    IndicatorSeparator: () => null,

    /** Custom chakra option component with icon support for multi select. */
    Option: memo(({ children, ...optionProps }: OptionProps<SelectOption, true, GroupBase<SelectOption>>) => (
      <chakraComponents.Option {...optionProps}>
        {optionProps.data.icon && <Icon name={optionProps.data.icon} style={{ marginRight: 10 }} />}
        {children}
      </chakraComponents.Option>
    )),

    /** Custom chakra tag component with icon support for multi select. */
    MultiValueContainer: memo(({
      children,
      ...multiValueProps
    }: MultiValueGenericProps<SelectOption, true, GroupBase<SelectOption>>) => {
      const selectedOptions = multiValueProps.selectProps.value as SelectOption[];
      const itemIndex = selectedOptions.findIndex(item => item.value === multiValueProps.data.value);

      if (displayLimit === 0 || itemIndex < displayLimit) {
        return (
          <chakraComponents.MultiValueContainer {...multiValueProps}>
            {multiValueProps.data.icon && <Icon name={multiValueProps.data.icon} style={{ marginRight: 4 }} />}
            {children}
          </chakraComponents.MultiValueContainer>
        );
      }

      if (displayLimit === itemIndex) {
        return (
          <chakraComponents.MultiValueContainer {...multiValueProps}>
            <Text h={6} fontWeight="medium">
              +
              {selectedOptions.length - displayLimit}
            </Text>
          </chakraComponents.MultiValueContainer>
        );
      }

      return null;
    }),
    ...components,
  }), [displayLimit, components]);

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
        chakraStyles={{ ...customMultiSelectChakraStyles, ...chakraStyles }}
        {...props}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const MultiSelect = memo(MultiSelectComponent);

import React, { memo, useCallback, useMemo, VFC } from 'react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { AsyncSelect } from 'chakra-react-select';
import { useController } from 'react-hook-form';
import { SelectOption } from '../../utils/selectOption';
import { Debounce } from '../../utils/debounce';
import { MultiSelect } from './base';

interface Props extends MultiSelect.Props {

  /** Function for options loading. */
  readonly loadOptions: (searchString: string) => Promise<SelectOption[]>;

  /** Delay between user input and fetching of options in milliseconds. */
  readonly debounceTime?: number;
}

/** Async multi select. */
const AsyncMultiSelectComponent: VFC<Props> = ({
  control,
  name,
  label,
  rules,
  components,
  chakraStyles,
  displayLimit = 0,
  loadOptions,
  debounceTime = Debounce.DEFAULT_DEBOUNCE_TIME_IN_MILLISECONDS,
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

  const asyncMultiSelectComponents = useMemo(() => MultiSelect.getComponents(displayLimit, components), [displayLimit, components]);

  const loadOptionsDebounced = useCallback(Debounce.apply(
    async(searchString: string, showLoadedOptions: (options: SelectOption[]) => void) => {
      const options = await loadOptions(searchString);
      showLoadedOptions(options);
    },
    debounceTime,
  ), []);

  return (
    <FormControl isInvalid={invalid} id={name}>
      <FormLabel>{label}</FormLabel>
      <AsyncSelect
        isMulti
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        selectedOptionStyle="check"
        hideSelectedOptions={false}
        components={asyncMultiSelectComponents}
        chakraStyles={{ ...MultiSelect.customChakraStyles, ...chakraStyles }}
        loadOptions={loadOptionsDebounced}
        cacheOptions
        {...props}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const AsyncMultiSelect = memo(AsyncMultiSelectComponent);

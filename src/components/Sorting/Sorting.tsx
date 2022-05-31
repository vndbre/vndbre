import React, { memo, ReactNode, useCallback, useState, VFC } from 'react';
import { Box, CSSObject, HStack, IconButton } from '@chakra-ui/react';
import { Select as ReactSelect, SingleValue } from 'chakra-react-select';
import { SortOptions, SortType } from '../../models/sortOptions';
import { SelectOption } from '../../utils/selectOption';
import { Icon } from '../Icon/Icon';
import { assertNonNull } from '../../utils/assertNonNull';
import { Select } from '../Select/base';

interface Props<T extends string> {

  /** Default field for sorting. */
  readonly defaultSortFieldOption: SelectOption<T>;

  /** Default sort direction. */
  readonly defaultDirection: SortType;

  /** All sorting fields. */
  readonly sortFieldOptions: readonly SelectOption<T>[];

  /** Callback to handle sorting change. */
  readonly onChange: (value: SortOptions<T>) => void;

  /** Min width in px. */
  // eslint-disable-next-line react/require-default-props
  readonly minWidth?: number;
}

/**
 * Toggles sort direction.
 * @param sort Current sort type.
 */
function toggleSort(sort: SortType): SortType {
  return sort === SortType.Ascending ? SortType.Descending : SortType.Ascending;
}

const customSelectStyles = {

  /**
   * Sets styles for the control component inside select.
   * @param provided Styles object.
   */
  control: (provided: CSSObject) => ({
    ...provided,
    bg: 'white',
  }),

  /**
   * Sets styles for the options menu component inside select.
   * @param provided Styles object.
   */
  menu: (provided: CSSObject) => ({
    ...provided,
    overflow: 'none',
  }),
};

/**
 * Sorting component.
 * @param props Props.
 */
const SortingComponent: ReactNode = <T extends string>(props: Props<T>) => {
  const { sortFieldOptions, defaultSortFieldOption, defaultDirection, onChange } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const minWidth = props.minWidth ?? 275;

  const [sortOptions, setSortOptions] = useState<SortOptions<T>>({ type: defaultDirection, field: defaultSortFieldOption.value });

  const handleDirectionButtonClick = useCallback(() => {
    setSortOptions(prev => {
      const newSortOptions = { ...prev, type: toggleSort(prev.type) };
      onChange(newSortOptions);
      return newSortOptions;
    });
  }, []);

  const handleSortingFieldChange = useCallback((value: SingleValue<SelectOption<T>>) => {
    assertNonNull(value);
    setSortOptions(prev => {
      const newSortOptions = { ...prev, field: value.value };
      onChange(newSortOptions);
      return newSortOptions;
    });
  }, []);

  return (
    <HStack minWidth={minWidth}>
      <IconButton
        aria-label="Toggle sorting direction"
        variant="ghost"
        colorScheme="gray"
        icon={<Icon name={sortOptions.type === SortType.Ascending ? 'mdi:sort-reverse-variant' : 'mdi:sort-variant'} />}
        onClick={handleDirectionButtonClick}
      />
      <Box width="full">
        <ReactSelect
          options={sortFieldOptions}
          onChange={handleSortingFieldChange}
          selectedOptionStyle="check"
          defaultValue={defaultSortFieldOption}
          components={Select.BASE_COMPONENTS}
          chakraStyles={customSelectStyles}
        />
      </Box>
    </HStack>
  );
};

export const Sorting = memo(SortingComponent as VFC<Props<string>>) as <T extends string>(props: Props<T>) => ReturnType<VFC<Props<T>>>;

import clsx from 'clsx';
import type { FC } from 'react';
import React, { memo } from 'react';
import type { ClassNamesConfig, GroupBase, MultiValue, Props as ReactSelectProps, SingleValue } from 'react-select';
import ReactSelect from 'react-select';
import type { SelectComponents } from 'react-select/dist/declarations/src/components';
import type { PropsWithClass } from 'src/utils/PropsWithClass';

import type { Option } from './Option';
import { SelectOption } from './SelectOption';
import { SelectMenu } from './SelectMenu';
import { SelectMultiValue } from './SelectMultiValue';
import { SelectClearIndicator } from './SelectClearIndicator';
import { SelectSingleValue } from './SelectSingleValue';

const components: Partial<SelectComponents<Option, boolean, GroupBase<Option>>> = {
  Menu: SelectMenu,
  Option: SelectOption,
  SingleValue: SelectSingleValue,
  MultiValue: SelectMultiValue,
  ClearIndicator: SelectClearIndicator,
};

export type SelectChangeValue = SingleValue<Option> | MultiValue<Option>;
export type SelectChangeHandler = (value: SelectChangeValue) => void;

export type SelectProps =
& PropsWithClass
& Pick<
  ReactSelectProps<Option>,
  | 'options'
  | 'closeMenuOnSelect'
  | 'hideSelectedOptions'
  | 'isMulti'
  | 'isClearable'
  | 'placeholder'
  | 'onBlur'
  | 'onFocus'
  | 'onInputChange'
  | 'onKeyDown'
  | 'onMenuClose'
  | 'onMenuOpen'
  | 'onMenuScrollToBottom'
  | 'onMenuScrollToTop'
>
& {

  /** Whether to disable search. */
  readonly disableSearch?: boolean;

  /** Size. */
  readonly size?: 'md' | 'lg';

  /** Change handler. */
  readonly onChange?: SelectChangeHandler;
};

/** Select component. */
const SelectComponent: FC<SelectProps> = ({
  className,
  closeMenuOnSelect = false,
  hideSelectedOptions = false,
  disableSearch = false,
  isClearable = false,
  size = 'md',
  ...props
}) => {
  /* eslint-disable jsdoc/require-jsdoc, @typescript-eslint/naming-convention */
  const inputClassNames = 'bg-transparent text-sm leading-6 focus:outline-none pl-2';
  const classNames: ClassNamesConfig<Option> = {
    container: () => clsx('', className),
    control: ({ menuIsOpen }) => clsx(
      'flex h-12 w-full items-center gap-1 rounded-md bg-gray-100 p-2 text-start', {
        'rounded-b-none': menuIsOpen,
      },
    ),
    input: ({ hasValue, isMulti }) => clsx(
      inputClassNames, {
        'pl-0': hasValue && isMulti,
      },
    ),
    singleValue: () => clsx(
      inputClassNames, 'flex', {
        'gap-1': size === 'md',
        'gap-2': size === 'lg',
      },
    ),
    placeholder: () => clsx(inputClassNames, 'overflow-hidden text-ellipsis whitespace-nowrap text-gray-500'),
    dropdownIndicator: () => '!hidden',
    menu: () => 'rounded-b-md bg-gray-100 p-2 pt-0 flex flex-col gap-2',
    option: ({ isFocused }) => clsx(
      '!flex items-center rounded bg-gray-100 text-sm leading-6 hover:bg-gray-200 focus:bg-gray-200', {
        'bg-gray-200': isFocused,
        'gap-1 px-2 py-1': size === 'md',
        'gap-2 p-2': size === 'lg',
      },
    ),
    valueContainer: ({ hasValue, isMulti }) => clsx('gap-2', {
      '!flex !flex-nowrap': hasValue && isMulti,
    }),
    multiValue: () => 'bg-gray-200',
  };

  return (
    <ReactSelect<Option, boolean>
      unstyled
      classNames={classNames}
      components={components}
      closeMenuOnSelect={closeMenuOnSelect}
      hideSelectedOptions={hideSelectedOptions}
      isSearchable={!disableSearch}
      isClearable={isClearable}
      {...props}
    />
  );
};

export const Select = memo(SelectComponent);

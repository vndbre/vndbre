import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef, ReactElement, Ref } from 'react';
import type { ActionMeta, ClassNamesConfig, MultiValue, Props as ReactSelectProps, SelectInstance, SingleValue } from 'react-select';
import ReactSelect from 'react-select';
import type { SelectComponents } from 'react-select/dist/declarations/src/components';
import type { PropsWithClass } from 'src/utils/PropsWithClass';

import { typedMemo } from 'src/api/utils/typedMemo';
import type { Group, Option } from './Option';
import { SelectOption } from './SelectOption';
import { SelectMenu } from './SelectMenu';
import { SelectMultiValue } from './SelectMultiValue';
import { SelectClearIndicator } from './SelectClearIndicator';
import { SelectSingleValue } from './SelectSingleValue';

export type SelectChangeValue<
  TOption extends Option = Option,
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
> = IsMulti extends true
  ? MultiValue<TOption>
  : IsClearable extends true
    ? SingleValue<TOption>
    : TOption;

export type SelectChangeHandler<
  TOption extends Option = Option,
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
> = (
  value: SelectChangeValue<TOption, IsMulti, IsClearable>,
  actionMeta: ActionMeta<TOption>
) => void;

export type SelectProps<
  TOption extends Option = Option,
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
  TGroup extends Group<TOption> = Group<TOption>,
> =
& PropsWithClass
& Pick<
ReactSelectProps<TOption, IsMulti, TGroup>,
  | 'options'
  | 'closeMenuOnSelect'
  | 'hideSelectedOptions'
  | 'isMulti'
  | 'placeholder'
  | 'onBlur'
  | 'onFocus'
  | 'onInputChange'
  | 'onKeyDown'
  | 'onMenuClose'
  | 'onMenuOpen'
  | 'onMenuScrollToBottom'
  | 'onMenuScrollToTop'
  | 'name'
  | 'value'
  | 'isLoading'
>
& {

  /** Whether select is clearable, means that value can be `null`. */
  readonly isClearable?: IsClearable;

  /** Whether to disable search. */
  readonly disableSearch?: boolean;

  /** Size. */
  readonly size?: 'md' | 'lg';

  /** Change handler. */
  readonly onChange?: SelectChangeHandler<TOption, IsMulti, IsClearable>;

};

/**
 * Select component.
 * @param props Props.
 * @param ref Forwarded ref.
 */
const SelectComponent = <
  TOption extends Option = Option,
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
  TGroup extends Group<TOption> = Group<TOption>,
>({
  className,
  closeMenuOnSelect = false,
  hideSelectedOptions = false,
  disableSearch = false,
  isClearable,
  size = 'md',
  onChange,
  ...props
}: SelectProps<TOption, IsMulti, IsClearable, TGroup>,
  ref: ForwardedRef<SelectInstance<TOption, IsMulti, TGroup>>,
): JSX.Element => {
  /* eslint-disable jsdoc/require-jsdoc, @typescript-eslint/naming-convention */
  const inputClassNames = 'bg-transparent text-sm leading-6 focus:outline-none pl-2';
  const classNames: ClassNamesConfig<TOption, IsMulti, TGroup> = {
    container: () => clsx('rounded-md bg-gray-100', className),
    control: ({ menuIsOpen }) => clsx(
      'flex h-12 w-full cursor-pointer items-center gap-1 rounded-md bg-gray-100 p-2 text-start', {
        'rounded-b-none': menuIsOpen,
      },
    ),
    input: ({ hasValue, isMulti }) => clsx(
      'cursor-text', inputClassNames, {
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
    menuList: () => 'py-2',
    menu: () => 'rounded-b-md bg-gray-100 px-2 flex flex-col shadow-lg',
    option: ({ isFocused }) => clsx(
      '!flex cursor-pointer items-center rounded bg-gray-100 text-sm leading-6 hover:bg-gray-200 focus:bg-gray-200', {
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

  const components = {
    Menu: SelectMenu,
    Option: SelectOption,
    SingleValue: SelectSingleValue,
    MultiValue: SelectMultiValue,
    ClearIndicator: SelectClearIndicator,

  // Believe me it's ok.
  } as unknown as Partial<SelectComponents<TOption, IsMulti, TGroup>>;
  return (
    <ReactSelect
      ref={ref}
      unstyled
      classNames={classNames}
      components={components}
      closeMenuOnSelect={closeMenuOnSelect}
      hideSelectedOptions={hideSelectedOptions}
      isSearchable={!disableSearch}
      isClearable={isClearable}

      // react-select doesn't support non nullable value in change handler.
      onChange={onChange as SelectChangeHandler<TOption, IsMulti, boolean>}
      {...props}
    />
  );
};

// Workaround to support generics with `forwardRef`
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export const Select = typedMemo(forwardRef(SelectComponent));

'use client';

import type { ForwardedRef } from 'react';
import { useId, forwardRef } from 'react';
import type { ActionMeta, ClassNamesConfig, MultiValue, Props as ReactSelectProps, SelectInstance, SingleValue } from 'react-select';
import ReactSelect from 'react-select';
import type { SelectComponents } from 'react-select/dist/declarations/src/components';
import type { PropsWithClass } from '@/types/propsWithClass';
import { typedMemo } from '@/api/utils/typedMemo';
import { cn } from '@/utils/cn';
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
  readonly size?: 'sm' | 'md';

  /** Option size. */
  readonly optionSize?: 'md' | 'lg';

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
  optionSize = 'md',
  onChange,
  ...props
}: SelectProps<TOption, IsMulti, IsClearable, TGroup>,
  ref: ForwardedRef<SelectInstance<TOption, IsMulti, TGroup>>,
): JSX.Element => {
  const inputClassNames = 'bg-transparent text-caption-18 focus:outline-none pl-2';
  const classNames: ClassNamesConfig<TOption, IsMulti, TGroup> = {
    container: () => cn('rounded-md bg-surface-2 ', className),
    control: ({ menuIsOpen, isFocused }) => cn(
      'outline-focus relative flex w-full cursor-pointer items-center gap-1 !rounded-md bg-surface-2 text-start transition-none', {
        '!rounded-b-none': menuIsOpen,
        'h-12 p-2': size === 'md',
        'h-10 px-2 py-1': size === 'sm',
        '!outline': isFocused && !menuIsOpen,
      },
    ),
    input: ({ hasValue, isMulti }) => cn(
      'cursor-text', inputClassNames, {
        'pl-0': hasValue && isMulti,
      },
    ),
    singleValue: () => cn(
      inputClassNames, 'flex', {
        'gap-1': optionSize === 'md',
        'gap-2': optionSize === 'lg',
      },
    ),
    placeholder: () => cn(inputClassNames, 'overflow-hidden text-ellipsis whitespace-nowrap text-on-surface-dim'),
    dropdownIndicator: () => 'hidden',
    menuList: () => 'py-2',
    menu: () => cn('flex flex-col rounded-b-md bg-surface-2 px-2 shadow-lg', {
    }),
    option: ({ isFocused }) => cn(
      'flex cursor-pointer items-center rounded text-caption-18 hover:bg-surface-overlay focus:bg-surface-overlay', {
        'bg-surface-overlay': isFocused,
        'gap-1 px-2 py-1': optionSize === 'md',
        'gap-2 p-2': optionSize === 'lg',
      },
    ),
    valueContainer: ({ hasValue, isMulti }) => cn('gap-2', {
      'flex flex-nowrap': hasValue && isMulti,
    }),
    multiValue: () => 'bg-surface-overlay',
    groupHeading: () => 'font-semibold text-xs text-on-surface-dim px-2',
    group: () => 'border-b border-red-500 py-2',
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
      instanceId={useId()}
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
    render: (props: P, ref: Ref<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}

export const Select = typedMemo(forwardRef(SelectComponent));

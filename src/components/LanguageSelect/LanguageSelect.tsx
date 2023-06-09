'use client';

import type { ForwardedRef } from 'react';
import { forwardRef, useMemo } from 'react';
import type { SelectInstance } from 'react-select';

import { LanguageCode, LANGUAGES_CODES } from '@/api/models/language';
import type { StrictOmit } from '@/api/utils/strictOmit';
import { typedMemo } from '@/api/utils/typedMemo';
import type { PropsWithClass } from '@/types/propsWithClass';

import { Icon } from '../Icon/Icon';
import type { SelectGroup, SelectOption, SelectProps } from '../Select';
import { Select } from '../Select';

type Props<
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
> =
& StrictOmit<
  SelectProps<SelectOption, IsMulti, IsClearable, SelectGroup<SelectOption>>,
  | 'options'
>
& PropsWithClass
& {
  readonly activeLanguages?: readonly LanguageCode[];
};

/**
 * Language select component.
 * @param ref Forwarded ref.
 */
const LanguageSelectComponent = <
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
>({
  activeLanguages = LANGUAGES_CODES,
  ...props
}: Props<IsMulti, IsClearable>,
  ref: ForwardedRef<SelectInstance<SelectOption, IsMulti, SelectGroup<SelectOption>>>,
): JSX.Element => {
  const options: SelectOption[] = useMemo(() => activeLanguages.map(code => ({
    label: LanguageCode.toReadable(code),
    icon: <Icon name={LanguageCode.getIconName(code)} />,
    value: code,
  })), [activeLanguages]);

  return (
    <Select {...props} options={options} ref={ref} optionSize="lg" />
  );
};

export const LanguageSelect = typedMemo(forwardRef(LanguageSelectComponent));

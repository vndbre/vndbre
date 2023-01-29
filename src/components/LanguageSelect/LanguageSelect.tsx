import React, { useMemo } from 'react';

import { LanguageCode } from 'src/api/models/language';

import type { StrictOmit } from 'src/api/utils/strictOmit';
import { typedMemo } from 'src/api/utils/typedMemo';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
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
 */
const LanguageSelectComponent = <
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
>({
  activeLanguages = LanguageCode.list,
  ...props
}: Props<IsMulti, IsClearable>): JSX.Element => {
  const options: SelectOption[] = useMemo(() => activeLanguages.map(code => ({
    label: LanguageCode.toReadable(code),
    icon: <Icon name={LanguageCode.getLanguageIconName(code)} />,
    value: code,
  })), []);

  return (
    <Select {...props} options={options} />
  );
};

export const LanguageSelect = typedMemo(LanguageSelectComponent);

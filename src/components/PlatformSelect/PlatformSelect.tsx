import React, { useMemo } from 'react';

import { Platform } from 'src/api/models/platform';

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
  readonly activePlatforms?: readonly Platform[];
};

/**
 * Language select component.
 */
const PlatformSelectComponent = <
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
>({
  activePlatforms = Platform.list,
  ...props
}: Props<IsMulti, IsClearable>): JSX.Element => {
  const options: SelectOption[] = useMemo(() => activePlatforms.map(platform => ({
    label: Platform.toReadable(platform),
    icon: <Icon name={Platform.getPlatformIconName(platform)} />,
    value: platform,
  })), [activePlatforms]);

  return (
    <Select {...props} options={options} />
  );
};

export const PlatformSelect = typedMemo(PlatformSelectComponent);

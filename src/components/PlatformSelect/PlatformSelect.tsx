import type { ForwardedRef } from 'react';
import { forwardRef, useMemo } from 'react';
import type { SelectInstance } from 'react-select';

import { Platform, PLATFORMS } from 'src/api/models/platform';

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
 * @param ref Forwarded ref.
 */
const PlatformSelectComponent = <
  IsMulti extends boolean = false,
  IsClearable extends boolean = false,
>({
  activePlatforms = PLATFORMS,
  ...props
}: Props<IsMulti, IsClearable>,
  ref: ForwardedRef<SelectInstance<SelectOption, IsMulti, SelectGroup<SelectOption>>>,
): JSX.Element => {
  const options: SelectOption[] = useMemo(() => activePlatforms.map(platform => ({
    label: Platform.toReadable(platform),
    icon: <Icon name={Platform.getIconName(platform)} />,
    value: platform,
  })), [activePlatforms]);

  return (
    <Select {...props} options={options} ref={ref} />
  );
};

export const PlatformSelect = typedMemo(forwardRef(PlatformSelectComponent));

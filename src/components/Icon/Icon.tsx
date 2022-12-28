import type { FC } from 'react';
import React, { memo } from 'react';
import { clsx } from 'clsx';
import { Icon as IconifyIcon } from '@iconify/react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';

/* eslint-disable @typescript-eslint/naming-convention */
const iconNames = {
  'burger': 'carbon:menu',
  'chevron-down': 'carbon:chevron-down',
  'flag': 'eva:flag-outline',
  'star': 'eva:star-outline',
  'edit': 'eva:edit-outline',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

/** Icon name. */
export type IconName = keyof typeof iconNames;

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
} as const;

/** Icon size in tailwind tokens. */
type IconSize = keyof typeof iconSizes;

/** Icon props. */
export interface IconProps {

  /** Icon name. */
  readonly name: IconName;

  /** Icon size in tailwind tokens. */
  readonly size?: IconSize;
}

/** Icon. */
const IconComponent: FC<PropsWithClass<IconProps>> = ({ name, className, size = 'md' }) => (
  <IconifyIcon
    icon={iconNames[name]}
    className={clsx(iconSizes[size], className)}
  />
);

export const Icon = memo(IconComponent);

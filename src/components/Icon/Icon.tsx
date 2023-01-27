import type { FC } from 'react';
import React, { memo } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import { cva, cx } from 'class-variance-authority';

const flagIconNames = {
  'flag-japan': 'emojione-v1:flag-for-japan',
  'flag-ukraine': 'emojione-v1:flag-for-ukraine',
  'flag-united-states': 'emojione-v1:flag-for-united-states',
  'flag-united-kingdom': 'emojione-v1:flag-for-united-kingdom',
  'flag-russia': 'emojione-v1:flag-for-russia',
  'flag-china': 'emojione-v1:flag-for-china',
  'flag-sweden': 'emojione-v1:flag-for-sweden',
  'flag-bangladesh': 'emojione-v1:flag-for-bangladesh',
};

const iconNames = {
  'burger': 'carbon:menu',
  'chevron-down': 'carbon:chevron-down',
  'close': 'heroicons:x-mark-20-solid',
  'view': 'carbon:view',
  'view-off': 'carbon:view-off',
  'flag': 'eva:flag-outline',
  'star': 'eva:star-outline',
  'edit': 'eva:edit-outline',
  ...flagIconNames,
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

/** Icon name. */
export type IconName = keyof typeof iconNames;

/** Icon size in tailwind tokens. */
type IconSize = 'sm' | 'md';

/** Icon props. */
export interface IconProps extends PropsWithClass {

  /** Icon name. */
  readonly name: IconName;

  /** Icon size in tailwind tokens. */
  readonly size?: IconSize;
}

/** Icon. */
const IconComponent: FC<IconProps> = ({ name, className, ...props }) => {
  const icon = cva([className], {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  });

  return (
    <IconifyIcon
      icon={iconNames[name]}
      className={cx(icon(props))}
    />
  );
};

export const Icon = memo(IconComponent);

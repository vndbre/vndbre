import type { FC } from 'react';
import React, { memo } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import { cva, cx } from 'class-variance-authority';

export const flagIconNames = {
  'flag-india': 'twemoji:flag-india',
  'flag-china': 'twemoji:flag-china',
  'flag-norway': 'twemoji:flag-norway',
  'flag-denmark': 'twemoji:flag-denmark',
  'flag-romania': 'twemoji:flag-romania',
  'flag-canada': 'twemoji:flag-canada',
  'flag-united-nations': 'twemoji:flag-united-nations',
  'flag-latvia': 'twemoji:flag-latvia',
  'flag-netherlands': 'twemoji:flag-netherlands',
  'flag-russia': 'twemoji:flag-russia',
  'flag-pakistan': 'twemoji:flag-pakistan',
  'flag-portugal': 'twemoji:flag-portugal',
  'flag-malaysia': 'twemoji:flag-malaysia',
  'flag-sweden': 'twemoji:flag-sweden',
  'flag-slovenia': 'twemoji:flag-slovenia',
  'flag-serbia': 'twemoji:flag-serbia',
  'flag-saudi-arabia': 'twemoji:flag-saudi-arabia',
  'flag-sri-lanka': 'twemoji:flag-sri-lanka',
  'flag-poland': 'twemoji:flag-poland',
  'flag-vietnam': 'twemoji:flag-vietnam',
  'flag-czechia': 'twemoji:flag-czechia',
  'flag-japan': 'twemoji:flag-japan',
  'flag-germany': 'twemoji:flag-germany',
  'flag-france': 'twemoji:flag-france',
  'flag-cook-islands': 'twemoji:flag-cook-islands',
  'flag-ireland': 'twemoji:flag-ireland',
  'flag-hungary': 'twemoji:flag-hungary',
  'flag-south-korea': 'twemoji:flag-south-korea',
  'flag-croatia': 'twemoji:flag-croatia',
  'flag-turkey': 'twemoji:flag-turkey',
  'flag-lithuania': 'twemoji:flag-lithuania',
  'flag-iran': 'twemoji:flag-iran',
  'flag-ukraine': 'twemoji:flag-ukraine',
  'flag-bulgaria': 'twemoji:flag-bulgaria',
  'flag-spain': 'twemoji:flag-spain',
  'flag-thailand': 'twemoji:flag-thailand',
  'flag-israel': 'twemoji:flag-israel',
  'flag-north-macedonia': 'twemoji:flag-north-macedonia',
  'flag-slovakia': 'twemoji:flag-slovakia',
  'flag-united-kingdom': 'twemoji:flag-united-kingdom',
  'flag-finland': 'twemoji:flag-finland',
  'flag-scotland': 'twemoji:flag-scotland',
  'flag-brazil': 'twemoji:flag-brazil',
  'flag-indonesia': 'twemoji:flag-indonesia',
  'flag-greece': 'twemoji:flag-greece',
  'flag-italy': 'twemoji:flag-italy',
  'white-flag': 'twemoji:white-flag',
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

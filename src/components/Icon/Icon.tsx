import type { FC } from 'react';
import { memo } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import type { PropsWithClass } from '@/types/propsWithClass';

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
} as const;

export const platformIconNames = {
  'windows': 'simple-icons:windows11',
  'linux': 'simple-icons:linux',
  'ios': 'simple-icons:ios',
  'android': 'simple-icons:android',
  'macos': 'simple-icons:macos',
  'gameboy': 'mdi:nintendo-game-boy',
  'pc': 'bi:pc-display-horizontal',
  'gamepad': 'mdi:gamepad-variant-outline',
  'sega': 'simple-icons:sega',
  'disk': 'mdi:disk',
  'playstaion-vita': 'simple-icons:playstationvita',
  'playstation': 'simple-icons:playstation',
  'playstation-2': 'simple-icons:playstation2',
  'playstation-3': 'simple-icons:playstation3',
  'playstation-4': 'simple-icons:playstation4',
  'playstation-5': 'simple-icons:playstation5',
  'playstation-portable': 'simple-icons:playstation',
  'nintendo-3ds': 'simple-icons:nintendo3ds',
  'wiiu': 'simple-icons:wiiu',
  'nintendo-switch': 'simple-icons:nintendoswitch',
  'nintendo': 'simple-icons:nintendo',
  'wii': 'simple-icons:wii',
  'xbox': 'simple-icons:xbox',
  'smartphone': 'eva:smartphone-outline',
  'chrome': 'simple-icons:googlechrome',
  'question-mark': 'eva:question-mark-circle-outline',
} as const;

/** Flag icon name. */
export type FlagIconName = keyof typeof flagIconNames;
export type PlatformIconName = keyof typeof platformIconNames;

const iconNames = {
  'burger': 'carbon:menu',
  'sun': 'heroicons:sun',
  'moon': 'heroicons:moon',
  'chevron-down': 'heroicons:chevron-down',
  'chevron-down-bold': 'heroicons:chevron-down-20-solid',
  'close': 'heroicons:x-mark',
  'view': 'heroicons:eye',
  'view-off': 'heroicons:eye-slash',
  'flag': 'eva:flag-outline',
  'star': 'heroicons:star',
  'edit': 'eva:edit-outline',
  'ellipsis': 'heroicons:ellipsis-horizontal-20-solid',
  'bookmark': 'heroicons:bookmark',
  'search': 'eva:search-outline',
  'options': 'eva:options-2-outline',
  'sort-desc': 'heroicons:bars-arrow-down-solid',
  'sort-asc': 'heroicons:bars-arrow-up-solid',
  'rectangle-stack': 'carbon:horizontal-view',
  'squares': 'heroicons:squares-2x2',
  ...flagIconNames,
  ...platformIconNames,
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

/** Icon name. */
export type IconName = keyof typeof iconNames;

/** Icon size in tailwind tokens. */
type IconSize = 'sm' | 'md' | 'lg';

/** Icon props. */
export interface IconProps extends PropsWithClass {

  /** Icon name. */
  readonly name: IconName;

  /** Icon size in tailwind tokens. */
  readonly size?: IconSize;
}

const icon = cva('', {
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/** Icon. */
const IconComponent: FC<IconProps> = ({ name, className, ...props }) => (
  <IconifyIcon
    icon={iconNames[name]}
    className={cn(icon(props), className)}
  />
);

export const Icon = memo(IconComponent);

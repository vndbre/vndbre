'use client';

import type { FC } from 'react';
import { memo } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cn } from '@/utils/cn';

export type RadioGroupItemProps = RadixRadioGroup.RadioGroupItemProps;

/** Radio group item. */
const RadioGroupItemComponent: FC<RadioGroupItemProps> = ({
  className, ...props
}) => (
  <RadixRadioGroup.Item
    {...props}
    className={cn(
      'grid h-5 w-5 place-items-center rounded-full border-2 border-border align-middle ', className,
    )}
  >
    <RadixRadioGroup.Indicator className="inset-0 block h-2.5 w-2.5 rounded-full bg-primary" />
  </RadixRadioGroup.Item>
);

export const RadioGroupItem = memo(RadioGroupItemComponent);

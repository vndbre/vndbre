'use client';

import type { FC } from 'react';
import { memo } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';

export type RadioGroupItemProps = RadixRadioGroup.RadioGroupItemProps;

/** Radio group item. */
const RadioGroupItemComponent: FC<RadioGroupItemProps> = ({
  className, ...props
}) => (
  <RadixRadioGroup.Item
    {...props}
    className={clsx(
      'border-border grid h-5 w-5 place-items-center rounded-full border-2 align-middle ', className,
    )}
  >
    <RadixRadioGroup.Indicator className="bg-primary inset-0 block h-2.5 w-2.5 rounded-full" />
  </RadixRadioGroup.Item>
);

export const RadioGroupItem = memo(RadioGroupItemComponent);

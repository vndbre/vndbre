'use client';

import type { FC } from 'react';
import React, { memo } from 'react';
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
      'grid h-5 w-5 place-items-center rounded-full border-2 border-gray-300 bg-white align-middle ', className,
    )}
  >
    <RadixRadioGroup.Indicator className="bg-primary-400 inset-0 block h-2.5 w-2.5 rounded-full" />
  </RadixRadioGroup.Item>
);

export const RadioGroupItem = memo(RadioGroupItemComponent);

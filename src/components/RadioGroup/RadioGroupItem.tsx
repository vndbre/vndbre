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
      'bg-primary-400 grid h-4 w-4 place-items-center rounded-full align-middle', className,
    )}
  >
    <RadixRadioGroup.Indicator className="inset-0 block h-2.5 w-2.5 rounded-full bg-white" />
  </RadixRadioGroup.Item>
);

export const RadioGroupItem = memo(RadioGroupItemComponent);

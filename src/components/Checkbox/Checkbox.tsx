import type { FC } from 'react';
import React, { memo } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';

/** Checkbox. */
const CheckboxComponent: FC<RadixCheckbox.CheckboxProps> = ({ className, ...props }) => (
  <RadixCheckbox.Root
    {...props}
    className={clsx('rounded-xs relative h-4 w-4 border-2 border-gray-300 align-middle', className)}
  >
    <RadixCheckbox.Indicator asChild className="text-primary-400 absolute left-0 top-[-2px]">
      <svg width="16" height="12" fill="none"><path fill="currentColor" d="M14.71 1.21a1 1 0 0 0-1.42 0L5.84 8.67 2.71 5.53A1.022 1.022 0 0 0 1.29 7l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47Z" /></svg>
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
);

export const Checkbox = memo(CheckboxComponent);

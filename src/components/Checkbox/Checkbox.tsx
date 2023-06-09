'use client';

import type { ForwardedRef } from 'react';
import { forwardRef, memo } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';

import type { StrictOmit } from '@/api/utils/strictOmit';
import { cn } from '@/utils/cn';

type Props = StrictOmit<RadixCheckbox.CheckboxProps, 'onChange' | 'onCheckedChange'> & {
  readonly onChange?: RadixCheckbox.CheckboxProps['onCheckedChange'];
};

/**
 * Checkbox.
 * @param ref Forwarded ref.
 */
const CheckboxComponent = (
  { className, onChange, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) => (
  <RadixCheckbox.Root
    ref={ref}
    onCheckedChange={onChange}
    {...props}
    className={cn('relative h-4 w-4 rounded-xs border-2 border-border align-middle', className)}
  >
    <RadixCheckbox.Indicator asChild className="absolute left-0 top-[-2px] text-primary">
      <svg width="16" height="12" fill="none"><path fill="currentColor" d="M14.71 1.21a1 1 0 0 0-1.42 0L5.84 8.67 2.71 5.53A1.022 1.022 0 0 0 1.29 7l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47Z" /></svg>
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
);

export const Checkbox = memo(forwardRef(CheckboxComponent));

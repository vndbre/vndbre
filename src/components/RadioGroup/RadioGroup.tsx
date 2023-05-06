'use client';

import type { FC, ForwardedRef } from 'react';
import { forwardRef, memo } from 'react';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import type { StrictOmit } from 'src/api/utils/strictOmit';

export type RadioGroupProps = StrictOmit<RadixRadioGroup.RadioGroupProps, 'onValueChange' | 'onChange'> & {
  readonly onChange?: RadixRadioGroup.RadioGroupProps['onValueChange'];
};

/**
 * Radio group .
 * @param ref Ref.
 */
const RadioGroupComponent: FC<RadioGroupProps> = ({
  onChange,
  ...props
}, ref: ForwardedRef<HTMLDivElement>) => (
  <RadixRadioGroup.Root
    ref={ref}
    onValueChange={onChange}
    {...props}
  />
);

export const RadioGroup = memo(forwardRef(RadioGroupComponent));

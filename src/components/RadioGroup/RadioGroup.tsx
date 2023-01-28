import type { FC } from 'react';
import React, { memo } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

export type RadioGroupProps = RadixRadioGroup.RadioGroupProps;

/** Radio group . */
const RadioGroupComponent: FC<RadioGroupProps> = ({
  ...props
}) => (
  <RadixRadioGroup.Root
    {...props}
  />
);

export const RadioGroup = memo(RadioGroupComponent);

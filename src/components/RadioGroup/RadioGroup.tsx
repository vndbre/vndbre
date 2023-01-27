import type { FC } from 'react';
import React, { memo } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

/** Radio group . */
const RadioGroupComponent: FC<RadixRadioGroup.RadioGroupProps> = ({
  ...props
}) => (
  <RadixRadioGroup.Root
    {...props}
  />
);

export const RadioGroup = memo(RadioGroupComponent);

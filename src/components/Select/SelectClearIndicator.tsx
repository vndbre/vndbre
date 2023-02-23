import React from 'react';
import type { ComponentType } from 'react';
import { components as c } from 'react-select';
import type { ClearIndicatorProps } from 'react-select';
import type { Option } from './Option';
import { IconButton } from '../IconButton/IconButton';

/** ClearIndicator. */
export const SelectClearIndicator: ComponentType<ClearIndicatorProps<Option>> = ({
  children, ...props
}) => (
  <c.ClearIndicator {...props}>
    <IconButton name="close" intent="tertiary" size="2xs" iconSize="sm" />
    {children}
  </c.ClearIndicator>
);

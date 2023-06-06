import React from 'react';
import type { ComponentType } from 'react';
import { components as c } from 'react-select';
import type { MenuProps } from 'react-select';
import type { Option } from './Option';

/** Menu. */
export const SelectMenu: ComponentType<MenuProps<Option>> = ({ children, ...props }) => (
  <c.Menu {...props}>
    <div className="bg-border h-px w-full px-2" />
    {children}
  </c.Menu>
);

import React from 'react';
import type { ComponentType } from 'react';
import { components as c } from 'react-select';
import type { MenuProps } from 'react-select';
import type { Option } from './Option';

/** Menu. */
export const SelectMenu: ComponentType<MenuProps<Option>> = ({ children, ...props }) => (
  <c.Menu {...props}>
    <div className="h-px w-full bg-gray-300 px-2" />
    {children}
  </c.Menu>
);

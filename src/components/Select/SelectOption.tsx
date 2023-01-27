import type { ComponentType } from 'react';
import React from 'react';
import { components as c } from 'react-select';
import type { OptionProps } from 'react-select';
import { Checkbox } from '../Checkbox/Checkbox';
import type { Option } from './Option';

/** Option. */
export const SelectOption: ComponentType<OptionProps<Option>> = ({
  children, ...props
}) => (
  <c.Option {...props}>
    <div className="flex gap-1 overflow-hidden">
      {props.data.icon ?? <div className="shrink-0">{props.data.icon}</div>}
      <span className="cursor-default overflow-hidden text-ellipsis">{children}</span>
    </div>
    {props.isSelected && <Checkbox className="pointer-events-none shrink-0" checked />}
  </c.Option>
);

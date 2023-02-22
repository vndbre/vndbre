import type { ComponentType } from 'react';
import React from 'react';
import { components as c } from 'react-select';
import type { OptionProps } from 'react-select';
import clsx from 'clsx';
import { Checkbox } from '../Checkbox/Checkbox';
import type { Option } from './Option';

/** Option. */
export const SelectOption: ComponentType<OptionProps<Option>> = ({
  children, className, ...props
}) => (
  <c.Option {...props} className={clsx('flex overflow-hidden', className)}>
    {props.data.icon != null && <div className="shrink-0">{props.data.icon}</div>}
    <span className="cursor-default overflow-hidden text-ellipsis">{children}</span>
    {props.isSelected && <Checkbox className="pointer-events-none ml-auto shrink-0" checked />}
  </c.Option>
);

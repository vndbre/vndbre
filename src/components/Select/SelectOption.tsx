import type { ComponentType } from 'react';
import { components as c } from 'react-select';
import type { OptionProps } from 'react-select';
import { cn } from '@/utils/cn';
import { Checkbox } from '../Checkbox/Checkbox';
import type { Option } from './Option';

/** Option. */
export const SelectOption: ComponentType<OptionProps<Option>> = ({
  children, className, ...props
}) => (
  <c.Option {...props} className={cn('flex overflow-hidden', className)}>
    {props.data.icon != null && <div className="shrink-0">{props.data.icon}</div>}
    <span className="overflow-hidden text-ellipsis line-clamp-1">{children}</span>
    {props.isSelected && <Checkbox className="pointer-events-none ml-auto shrink-0" checked />}
  </c.Option>
);

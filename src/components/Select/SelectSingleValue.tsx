import React from 'react';
import type { ComponentType } from 'react';
import { components as c } from 'react-select';
import type { SingleValueProps } from 'react-select';
import type { Option } from './Option';

/** SingleValue. */
export const SelectSingleValue: ComponentType<SingleValueProps<Option>> = ({
  data, ...props
}) => (
  <c.SingleValue data={data} {...props}>
    {data.icon != null && <div className="shrink-0">{data.icon}</div>}
    <span className="overflow-hidden text-ellipsis">{data.label}</span>
  </c.SingleValue>
);

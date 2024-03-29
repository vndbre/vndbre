import React from 'react';
import type { ComponentType } from 'react';
import type { MultiValueProps } from 'react-select';
import { Tag } from '../Tag/Tag';
import type { Option } from './Option';

/** MultiValue. */
export const SelectMultiValue: ComponentType<MultiValueProps<Option>> = ({
  children, ...props
}) => {
  const count = props.getValue().length - 1;
  const isCountVisible = count === props.index && count !== 0;
  return (
    <>
      <Tag
        {...props}
        className="bg-surface-overlay [&:nth-of-type(n+2)]:hidden"
        iconLeft={props.data.icon}
      >
        {children}
      </Tag>
      {isCountVisible && (
        <Tag className="bg-surface-overlay shrink-0">
          +
          {count}
        </Tag>
      )}
    </>
  );
};

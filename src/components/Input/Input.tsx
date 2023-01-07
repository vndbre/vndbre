import type { ReactNode, HTMLInputTypeAttribute, ChangeEventHandler } from 'react';
import React, { forwardRef, useState, memo } from 'react';

import clsx from 'clsx';

/** Props for the input component. */
export interface InputProps {

  /** Id attribute. */
  readonly id?: string;

  /** Placeholder. */
  readonly placeholder?: string;

  /** Whether the input should be disabled. */
  readonly isDisabled?: boolean;
}

interface Props extends InputProps {

  /** Name attribute. */
  readonly name: string;

  /** Input value. */
  readonly value: string;

  /** Input change callback. */
  readonly onChange: ChangeEventHandler<HTMLInputElement>;

  /** Type attribute. Default value is `text`. */
  readonly type?: HTMLInputTypeAttribute;

  /** The element that will be placed on the right side of the input. */
  readonly rightElement?: ReactNode;
}

/** Input. */
const InputComponent = forwardRef<HTMLInputElement, Props>(({
  id,
  name,
  value,
  onChange,
  placeholder,
  isDisabled,
  type,
  rightElement,
}, ref) => {
  const [isInputGroupFocused, setIsInputGroupFocused] = useState(false);

  return (
    <div className={clsx('ring-primary-300 flex items-center rounded bg-gray-100 px-3', isInputGroupFocused ? 'ring-4' : undefined)}>
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        ref={ref}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        onFocus={() => setIsInputGroupFocused(true)}
        onBlur={() => setIsInputGroupFocused(false)}
        className="grow rounded border-none bg-inherit py-3 text-sm leading-6 focus:outline-none"
      />
      { rightElement }
    </div>
  );
});
InputComponent.displayName = 'Input';

export const Input = memo(InputComponent);

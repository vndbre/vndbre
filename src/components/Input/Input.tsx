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

  /** Whether the input is in invalid state. */
  readonly isInvalid?: boolean;
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
  isInvalid,
  type,
  rightElement,
}, ref) => {
  const [isInputGroupFocused, setIsInputGroupFocused] = useState(false);

  return (
    <div className={clsx(
      'ring-primary-300 relative flex items-center rounded bg-gray-100',
      isInputGroupFocused ? 'ring-4' : undefined,
      isInvalid && isInputGroupFocused === false ? 'ring-4 ring-red-500' : undefined,
    )}
    >
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
        className="grow rounded border-none bg-inherit p-3 pr-11 text-sm leading-6 focus:outline-none"
        // eslint-disable-next-line @typescript-eslint/naming-convention
        {...(isInvalid ? { 'aria-invalid': true } : null)}
      />
      { rightElement && <div className="absolute right-2 z-10">{ rightElement }</div> }
    </div>
  );
});
InputComponent.displayName = 'Input';

export const Input = memo(InputComponent);

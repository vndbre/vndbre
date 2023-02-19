import type { ReactNode, HTMLInputTypeAttribute, ChangeEventHandler, InputHTMLAttributes, ForwardedRef, FC } from 'react';
import React, { forwardRef, useState, memo } from 'react';

import clsx from 'clsx';

/** Props for the input component. */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

  /** Id attribute. */
  readonly id?: string;

  /** Placeholder. */
  readonly placeholder?: string;

  /** Whether the input should be disabled. */
  readonly isDisabled?: boolean;

  /** The element that will be placed on the left side of the input. */
  readonly leftElement?: ReactNode;
}

interface Props extends InputProps {

  /** The element that will be placed on the right side of the input. */
  readonly rightElement?: ReactNode;
}

/**
 * Input.
 * @param ref Forwarded ref.
 */
const InputComponent: FC<Props> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  isDisabled,
  type,
  leftElement,
  onBlur,
  rightElement,
  onFocus,
  className,
}, ref: ForwardedRef<HTMLInputElement>) => {
  const [isInputGroupFocused, setIsInputGroupFocused] = useState(false);

  return (
    <div className={clsx(
      'ring-primary-300 relative flex items-center rounded-md bg-gray-100', {
        'ring-4': isInputGroupFocused,
      },
    )}
    >
      <div className="absolute left-4 grid place-items-center">
        { leftElement }
      </div>
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        ref={ref}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        onFocus={e => {
          setIsInputGroupFocused(true);
          onFocus?.(e);
        }}
        onBlur={e => {
          setIsInputGroupFocused(false);
          onBlur?.(e);
        }}
        className={clsx(
          'grow rounded-md border-none bg-inherit py-3 text-sm leading-6 focus:outline-none',
          {
            'px-12': leftElement,
            'px-4': !leftElement,
          },
          className,
        )}
      />
      <div className="absolute right-4 grid place-items-center">
        { rightElement }
      </div>
    </div>
  );
};
InputComponent.displayName = 'Input';

export const Input = memo(forwardRef(InputComponent));

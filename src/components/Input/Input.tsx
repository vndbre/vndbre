import type { ReactNode, InputHTMLAttributes, ForwardedRef, FC, FormEventHandler } from 'react';
import React, { useRef, forwardRef, useState, memo } from 'react';

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

  /** Whether input will grow/shrink depending on content inside. */
  readonly hasAutoWidth?: boolean;
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
  hasAutoWidth,
  ...props
}, ref: ForwardedRef<HTMLInputElement>) => {
  const [isInputGroupFocused, setIsInputGroupFocused] = useState(false);

  const textMirrorRef = useRef<HTMLSpanElement>(null);

  const handleInput: FormEventHandler<HTMLInputElement> = e => {
    if (hasAutoWidth && textMirrorRef.current != null) {
      const target = e.target as HTMLInputElement;
      textMirrorRef.current.textContent = target.value;
      target.style.width = `${textMirrorRef.current.scrollWidth}px`;
    }
  };

  const inputPaddingClass = {
    'px-11': leftElement,
    'px-3': !leftElement,
  };

  return (
    <div className={clsx(
      'ring-primary-300 relative flex items-center overflow-hidden rounded-md bg-gray-100 text-sm leading-6', {
        'ring-4': isInputGroupFocused,
      },
    )}
    >
      {hasAutoWidth && <span className={clsx('pointer-events-none absolute py-3 opacity-0', inputPaddingClass)} ref={textMirrorRef} />}
      <div className="pointer-events-none absolute left-3 grid place-items-center">
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
        onInput={handleInput}
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
          'bg-inherit py-3 focus:outline-none',
          inputPaddingClass,
          className,
        )}
        style={{
          width: hasAutoWidth ? 0 : undefined,
        }}
        {...props}
      />
      <div className="absolute right-2 grid place-items-center">
        { rightElement }
      </div>
    </div>
  );
};
InputComponent.displayName = 'Input';

export const Input = memo(forwardRef(InputComponent));

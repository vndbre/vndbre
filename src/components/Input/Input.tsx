'use client';

import type { ReactNode, InputHTMLAttributes, ForwardedRef, FC, FormEventHandler } from 'react';
import React, { useRef, forwardRef, memo } from 'react';

import clsx from 'clsx';

/** Props for the input component. */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

  /** Id attribute. */
  readonly id?: string;

  /** Placeholder. */
  readonly placeholder?: string;

  /** Whether the input should be disabled. */
  readonly isDisabled?: boolean;

  /** Whether the input is in invalid state. */
  readonly isInvalid?: boolean;

  /** The element that will be placed on the left side of the input. */
  readonly leftElement?: ReactNode;

  /** The element that will be placed on the right side of the input. */
  readonly rightElement?: ReactNode;

  /** Whether input will grow/shrink depending on content inside. */
  readonly hasAutoWidth?: boolean;
}

/**
 * Input.
 * @param ref Forwarded ref.
 */
const InputComponent: FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  isDisabled,
  isInvalid,
  type,
  leftElement,
  onBlur,
  rightElement,
  onFocus,
  className,
  hasAutoWidth,
  ...props
}, ref: ForwardedRef<HTMLInputElement>) => {
  const textMirrorRef = useRef<HTMLSpanElement>(null);

  /**
   * Resize input depending on content.
   * @param event Event.
   */
  const handleInput: FormEventHandler<HTMLInputElement> = event => {
    if (hasAutoWidth && textMirrorRef.current != null) {
      const target = event.target as HTMLInputElement;
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
      'text-caption-18 relative flex items-center',
    )}
    >
      {hasAutoWidth && <span className={clsx('pointer-events-none absolute py-3 opacity-0', inputPaddingClass)} ref={textMirrorRef} />}
      {leftElement && <div className="pointer-events-none absolute left-3 grid place-items-center">{ leftElement }</div>}
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
        onFocus={onFocus}
        onBlur={onBlur}
        className={clsx(
          'outline-primary-300 grow rounded-md bg-gray-100 py-3 outline-2 outline-offset-0',
          inputPaddingClass,
          {
            'outline-red-400': isInvalid,
            'pl-12': leftElement,
            'pr-12': rightElement,
          },
          className,
        )}
        style={{
          width: hasAutoWidth ? 0 : undefined,
        }}
        // eslint-disable-next-line @typescript-eslint/naming-convention
        {...(isInvalid ? { 'aria-invalid': true } : null)}
        {...props}
      />
      {rightElement && <div className="absolute right-2 grid place-items-center">{ rightElement }</div>}
    </div>
  );
};
InputComponent.displayName = 'Input';

export const Input = memo(forwardRef(InputComponent));

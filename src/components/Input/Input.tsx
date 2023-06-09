'use client';

import { cn } from '@/utils/cn';
import type { ReactNode, InputHTMLAttributes, ForwardedRef, FormEventHandler } from 'react';
import { useRef, forwardRef, memo } from 'react';

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
const InputComponent = ({
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
}: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
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
    <div className={cn(
      'relative flex items-center text-caption-18',
    )}
    >
      {hasAutoWidth && <span className={cn('pointer-events-none absolute py-3 opacity-0', inputPaddingClass)} ref={textMirrorRef} />}
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
        className={cn(
          'grow rounded-md bg-surface-overlay py-3 outline-2 outline-offset-0 outline-primary',
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

import React, { memo } from 'react';
import type { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import { cva, cx } from 'class-variance-authority';
import type { PropsWithChildrenAndClass } from 'src/utils/PropsWithClass';

/** Button intent. */
export type ButtonIntent = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

/** Button size. */
export type ButtonSize = 'xs' | 'sm' | 'md';

/** Button props. */
export interface ButtonProps {

  /** Button intent. */
  readonly intent?: ButtonIntent;

  /** Button size. */
  readonly size?: ButtonSize;

  /** Button type. */
  readonly type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];

  /** Click handler. */
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;

  /** Is button disabled. */
  readonly isDisabled?: boolean;

  /** `aria-label` attribute. */
  readonly ariaLabel?: string;
}

interface Props extends ButtonProps {

  /** Is button square. */
  readonly isSquare?: boolean;

  /**
   * Is button has smaller horizontal paddings.
   * Doesn't work when `isSquare` enabled.
   */
  readonly hasSmallPaddings?: boolean;
}

/** Button. */
const ButtonComponent: FC<PropsWithChildrenAndClass<Props>> = ({
  children,
  type = 'button',
  className,
  onClick,
  isDisabled,
  ariaLabel,
  ...props
}) => {
  const button = cva([
    'whitespace-nowrap font-medium font-base leading-6 focus:outline-none ring-primary-300 focus-visible:ring-4 transition-colors',
    className,
  ], {
    variants: {
      intent: {
        primary: 'bg-primary-500 text-white hover:bg-primary-400 disabled:bg-gray-50 disabled:text-gray-500',
        secondary: 'bg-primary-100 text-primary-600 hover:bg-primary-200 disabled:bg-gray-50 disabled:text-gray-500',
        tertiary: 'bg-gray-100 text-black hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
        quaternary: 'bg-transparent text-black hover:bg-gray-200 disabled:bg-transparent disabled:text-gray-500',
      },
      isSquare: {
        true: 'grid place-content-center',
      },
      hasSmallPaddings: {
        true: '',
      },
      size: {
        xs: 'rounded',
        sm: 'rounded-md',
        md: 'rounded-md',
      },
    },
    compoundVariants: [
      {
        size: 'xs',
        isSquare: true,
        class: 'w-8 h-8',
      },
      {
        size: 'sm',
        isSquare: false,
        hasSmallPaddings: false,
        class: 'px-5 py-2',
      },
      {
        size: 'sm',
        hasSmallPaddings: true,
        class: 'px-3 py-2',
      },
      {
        size: 'sm',
        isSquare: true,
        class: 'w-10 h-10',
      },
      {
        size: 'md',
        isSquare: false,
        hasSmallPaddings: false,
        class: 'px-6 py-3',
      },
      {
        size: 'md',
        hasSmallPaddings: true,
        class: 'px-4 py-3',
      },
      {
        size: 'md',
        isSquare: true,
        class: 'w-12 h-12',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      isSquare: false,
      hasSmallPaddings: false,
      size: 'md',
    },
  });

  return (
    <button
      aria-label={ariaLabel}
      type={type}
      className={cx(button(props))}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Button = memo(ButtonComponent);

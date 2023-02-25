import React, { forwardRef, memo } from 'react';
import type { ButtonHTMLAttributes, FC, MouseEventHandler, ForwardedRef, ReactNode } from 'react';
import { cva, cx } from 'class-variance-authority';
import type { PropsWithChildrenAndClass } from 'src/utils/PropsWithClass';
import type { LinkProps } from '../Link/Link';
import { Link } from '../Link/Link';
import { useButtonGroupContext } from '../ButtonGroup/ButtonGroupProvider';

/** Button intent. */
export type ButtonIntent = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

/** Button size. */
export type ButtonSize = '2xs' | 'xs' | 'sm' | 'md';

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

type Props =
& ButtonProps
& {

  /** Is button square. */
  readonly isSquare?: boolean;

  /**
   * Is button has smaller horizontal paddings.
   * Doesn't work when `isSquare` enabled.
   */
  readonly hasSmallPaddings?: boolean;

  /** The element that will be placed on the left side of the button. */
  readonly leftElement?: ReactNode;
}
& (
  & {

    /** Whether element is link looking like button. */
    readonly isLink?: boolean;
  }
  & LinkProps
  & (
  | {
    readonly isLink?: undefined;
    readonly href?: undefined;
    readonly external?: undefined;
  }
  | {
    readonly isLink: true;
    readonly href: string;
    readonly external?: boolean;
  }
  )
);

/**
 * Button.
 * @param ref Forwarded ref.
 */
const ButtonComponent: FC<PropsWithChildrenAndClass<Props>> = ({
  children,
  type = 'button',
  className,
  onClick,
  isDisabled,
  ariaLabel,
  leftElement,
  isLink,
  href,
  external,
  ...props
}, ref: ForwardedRef<HTMLButtonElement>) => {
  const buttonGroup = useButtonGroupContext();

  const button = cva([
    'whitespace-nowrap text-caption-20 focus:outline-none ring-primary-300 focus-visible:ring-4 transition-colors flex gap-2 justify-center items-center',
    className,
  ], {
    variants: {
      intent: {
        primary: 'bg-primary-400 text-white hover:bg-primary-500 disabled:bg-gray-50 disabled:text-gray-500',
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
        '2xs': 'rounded',
        'xs': 'rounded',
        'sm': 'rounded-md',
        'md': 'rounded-md',
      },
    },
    compoundVariants: [
      {
        size: '2xs',
        isSquare: true,
        class: 'w-6 h-6',
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
      intent: buttonGroup.intent ?? 'primary',
      isSquare: false,
      hasSmallPaddings: false,
      size: buttonGroup.size ?? 'md',
    },
  });

  if (isLink) {
    return (
      <Link
        href={href}
        external={external}
        isUnstyled
        className={cx(button(props))}
      >
        {leftElement && leftElement}
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      type={type}
      className={cx(button(props))}
      disabled={isDisabled ?? buttonGroup.isDisabled}
      onClick={onClick}
    >
      {leftElement && leftElement}
      {children}
    </button>
  );
};

ButtonComponent.displayName = 'Button';

export const Button = memo(forwardRef(ButtonComponent));

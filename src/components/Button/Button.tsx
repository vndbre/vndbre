import { forwardRef, memo } from 'react';
import type { ButtonHTMLAttributes, MouseEventHandler, ForwardedRef, ReactNode, AriaAttributes, ElementType } from 'react';
import { cva, cx } from 'class-variance-authority';
import type { PropsWithChildrenAndClass } from 'src/types/propsWithClass';
import type { PolymorphicProps } from 'src/types/polymorphicProps';
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
}

type Props<C extends ElementType> =
& AriaAttributes
& PropsWithChildrenAndClass
& PolymorphicProps<C>
& Pick<ButtonProps,
  | 'intent'
  | 'size'
>
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
};

/**
 * Button.
 * @param ref Forwarded ref.
 */
const ButtonComponent = <C extends ElementType>({
  children,
  type = 'button',
  className,
  onClick,
  isDisabled,
  leftElement,
  as,
  ...props
}: Props<C>, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
  const Component = as ?? 'button';

  const buttonGroup = useButtonGroupContext();

  const button = cva([
    'whitespace-nowrap text-caption-20 transition-colors flex gap-2 justify-center items-center focus:z-10 relative overflow-hidden group disabled:bg-transparent disabled:text-on-surface-dim',
    className,
  ], {
    variants: {
      intent: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-on-secondary',
        tertiary: 'bg-surface-overlay text-on-surface',
        quaternary: 'bg-transparent text-on-surface',
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
      intent: buttonGroup.intent ?? 'primary',
      isSquare: false,
      hasSmallPaddings: false,
      size: buttonGroup.size ?? 'md',
    },
  });

  const buttonOverlay = cva([
    'absolute inset-0',
    className,
  ], {
    variants: {
      intent: {
        primary: 'group-hover:bg-primary-overlay',
        secondary: 'group-hover:bg-secondary-overlay',
        tertiary: 'group-hover:bg-surface-overlay',
        quaternary: 'group-hover:bg-surface-overlay',
      },
    },
    defaultVariants: {
      intent: buttonGroup.intent ?? 'primary',
    },
  });

  const { intent, isSquare, hasSmallPaddings, size, ...componentProps } = props;

  const buttonClassName = cx(button({ intent, isSquare, hasSmallPaddings, size }));
  const buttonOverlayClassName = cx(buttonOverlay({ intent }));

  return (
    <Component
      ref={ref}
      type={type}
      className={buttonClassName}
      disabled={isDisabled ?? buttonGroup.isDisabled}
      onClick={onClick}
      {...componentProps}
    >
      {leftElement}
      {isDisabled ?? buttonGroup.isDisabled ?? <div className={buttonOverlayClassName} />}
      <span className="z-10">{children}</span>
    </Component>
  );
};

ButtonComponent.displayName = 'Button';

export const Button = memo(forwardRef(ButtonComponent));

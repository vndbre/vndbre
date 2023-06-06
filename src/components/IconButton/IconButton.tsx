import type { AriaAttributes, FC, ForwardedRef } from 'react';
import { forwardRef, memo } from 'react';

import type { PropsWithClass } from 'src/types/propsWithClass';
import type { ButtonProps } from '../Button/Button';
import { Button } from '../Button/Button';
import type { IconProps } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';

type Props =
& AriaAttributes
& Pick<ButtonProps, 'intent' | 'onClick'>
& Pick<IconProps, 'name'>
& {

  /** Icon button size. */
  readonly size?: ButtonProps['size'];

  /** Icon size. */
  readonly iconSize?: IconProps['size'];
};

/**
 * Icon button.
 * @param ref Forwarded ref.
 */
const IconButtonComponent: FC<PropsWithClass<Props>> = ({
  intent,
  name,
  className,
  size,
  onClick,
  iconSize,
  ...props
}, ref: ForwardedRef<HTMLButtonElement>) => (
  <Button
    ref={ref}
    className={className}
    intent={intent}
    size={size}
    isSquare
    onClick={onClick}
    {...props}
  >
    <Icon name={name} size={iconSize} />
  </Button>
);

IconButtonComponent.displayName = 'IconButton';

export const IconButton = memo(forwardRef(IconButtonComponent));

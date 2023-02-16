import type { FC, ForwardedRef } from 'react';
import React, { forwardRef, memo } from 'react';

import type { PropsWithClass } from 'src/utils/PropsWithClass';
import type { ButtonProps } from '../Button/Button';
import { Button } from '../Button/Button';
import type { IconProps } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';

type Props = Pick<ButtonProps, 'intent' | 'onClick' | 'ariaLabel'> & Pick<IconProps, 'name'> & {

  /** Icon button size. */
  readonly size?: ButtonProps['size'];
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
  ariaLabel,
  onClick,
}, ref: ForwardedRef<HTMLButtonElement>) => (
  <Button
    ref={ref}
    className={className}
    intent={intent}
    size={size}
    isSquare
    ariaLabel={ariaLabel}
    onClick={onClick}
  >
    <Icon name={name} />
  </Button>
);

IconButtonComponent.displayName = 'IconButton';

export const IconButton = memo(forwardRef(IconButtonComponent));

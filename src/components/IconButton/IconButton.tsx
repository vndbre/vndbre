import type { FC } from 'react';
import React, { memo } from 'react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import type { ButtonProps } from '../Button/Button';
import { Button } from '../Button/Button';
import type { IconProps } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';

type Props = Pick<ButtonProps, 'intent'> & Pick<IconProps, 'name'> & {

  /** Icon button size. */
  readonly size?: ButtonProps['size'];
};

/** Icon button. */
const IconButtonComponent: FC<PropsWithClass<Props>> = ({
  intent,
  name,
  className,
  size,
}) => (
  <Button
    className={className}
    intent={intent}
    size={size}
    isSquare
  >
    <Icon name={name} />
  </Button>
);

export const IconButton = memo(IconButtonComponent);

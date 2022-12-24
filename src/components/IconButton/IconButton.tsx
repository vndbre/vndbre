import clsx from 'clsx';
import type { FC } from 'react';
import React, { memo } from 'react';
import type { PropsWithClass } from '../../utils/PropsWithClass';
import type { ButtonProps, ButtonSize } from '../Button/Button';
import { Button } from '../Button/Button';
import type { IconProps } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'p-2',
  md: 'p-3',
};

type Props = ButtonProps & Pick<IconProps, 'name'>;

/** Icon button. */
const IconButtonComponent: FC<PropsWithClass<Props>> = ({
  intent,
  name,
  size = 'md',
  className,
}) => (
  <Button
    intent={intent}
    className={clsx(buttonSizes[size], className)}
    isSquare
  >
    <Icon name={name} />
  </Button>
);

export const IconButton = memo(IconButtonComponent);

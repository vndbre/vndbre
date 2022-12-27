import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import React, { memo } from 'react';
import { Button } from '../Button/Button';

interface Props {

  /** Tab name. */
  readonly name: string;

  /** Is active. */
  readonly isActive?: boolean;

  /** Is tab disabled. */
  readonly isDisabled?: boolean;

  /** Click callback. */
  readonly onClick?: (name: Props['name']) => void;
}

/** Tab. */
const TabComponent: FC<PropsWithChildren<Props>> = ({
  children,
  name,
  isActive,
  isDisabled,
  onClick,
}) => (
  <div className="flex flex-col gap-1.5">
    <Button
      className="font-normal"
      intent="quaternary"
      size="sm"
      hasSmallPaddings
      isDisabled={isDisabled}
      onClick={() => onClick?.(name)}
    >
      {children}
    </Button>
    <div
      className={clsx('border-b-2 border-transparent mx-3', {
        'border-primary-500': isActive,
      })}
    />
  </div>
);

export const Tab = memo(TabComponent);

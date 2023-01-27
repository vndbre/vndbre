import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import type { PropsWithChildrenAndClass } from '../../utils/PropsWithClass';

interface Props extends PropsWithChildrenAndClass {

  /** Left icon. */
  readonly iconLeft?: ReactNode;
}

/** Tag. */
const TagComponent: FC<Props> = ({ children, className, iconLeft }) => (
  <div
    className={clsx(
      'flex cursor-default gap-1 overflow-hidden rounded bg-gray-100 px-2 py-1 text-sm leading-6', className,
    )}
  >
    {iconLeft != null && <div className="shrink-0">{iconLeft}</div>}
    <span className="overflow-hidden text-ellipsis">{children}</span>
  </div>
);

export const Tag = memo(TagComponent);

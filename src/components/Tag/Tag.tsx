import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import type { PropsWithChildrenAndClass } from '../../utils/PropsWithClass';

interface Props extends PropsWithChildrenAndClass {

  /** Left icon. */
  readonly iconLeft?: ReactNode;

  /** Whether tag is multiline. */
  readonly isMultiLine?: boolean;
}

/** Tag. */
const TagComponent: FC<Props> = ({ children, className, iconLeft, isMultiLine }) => (
  <div
    className={clsx(
      'flex cursor-default items-center gap-1 overflow-hidden rounded bg-gray-100 px-2 py-1 text-sm leading-6', className,
    )}
  >
    {iconLeft != null && <div className="shrink-0">{iconLeft}</div>}
    <div
      className={clsx('overflow-hidden text-ellipsis', {
        'line-clamp-1': !isMultiLine,
      })}
    >
      {children}
    </div>
  </div>
);

export const Tag = memo(TagComponent);

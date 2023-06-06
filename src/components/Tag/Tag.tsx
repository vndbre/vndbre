import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import type { PropsWithChildrenAndClass } from '../../types/propsWithClass';

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
      'text-caption-18 flex items-center gap-1 overflow-hidden rounded bg-gray-100 px-2 py-1', className,
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

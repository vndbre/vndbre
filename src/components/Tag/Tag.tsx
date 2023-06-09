import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { cn } from '@/utils/cn';
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
    className={cn(
      'flex items-center gap-1 overflow-hidden rounded bg-surface-overlay px-2 py-1 text-caption-18', className,
    )}
  >
    {iconLeft != null && <div className="shrink-0">{iconLeft}</div>}
    <div
      className={cn('overflow-hidden text-ellipsis', {
        'line-clamp-1': !isMultiLine,
      })}
    >
      {children}
    </div>
  </div>
);

export const Tag = memo(TagComponent);

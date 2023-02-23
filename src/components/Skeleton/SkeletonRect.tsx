import clsx from 'clsx';
import type { FC } from 'react';
import { memo } from 'react';
import type { PropsWithChildrenAndClass } from 'src/utils/PropsWithClass';

/** Rectangle skeleton component. */
const SkeletonRectComponent: FC<PropsWithChildrenAndClass> = ({
  children, className,
}) => (
  <div className={clsx('animate-pulse bg-gray-200', className)}>
    {children}
  </div>
);

export const SkeletonRect = memo(SkeletonRectComponent);

import clsx from 'clsx';
import type { FC } from 'react';
import { memo } from 'react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import type { PropsWithStyle } from 'src/utils/PropsWithStyle';

type Props =
& PropsWithStyle
& PropsWithClass;

/** Rectangle skeleton component. */
const SkeletonRectComponent: FC<Props> = ({
  className, ...props
}) => (
  <div {...props} className={clsx('animate-pulse bg-gray-200', className)} />
);

export const SkeletonRect = memo(SkeletonRectComponent);

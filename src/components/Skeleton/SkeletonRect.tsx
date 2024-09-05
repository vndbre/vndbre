import { cn } from '@/utils/cn';
import type { FC } from 'react';
import { memo } from 'react';
import type { PropsWithClass } from '@/types/propsWithClass';
import type { PropsWithStyle } from '@/types/propsWithStyle';

type Props =
& PropsWithStyle
& PropsWithClass;

/** Rectangle skeleton component. */
const SkeletonRectComponent: FC<Props> = ({
  className, ...props
}) => (
  <div {...props} className={cn('bg-surface-3 animate-pulse', className)} />
);

export const SkeletonRect = memo(SkeletonRectComponent);

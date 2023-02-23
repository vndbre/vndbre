import type { FC } from 'react';
import { SkeletonRect } from '../Skeleton/SkeletonRect';

/** Skeleton for poster component. */
export const PosterSkeleton: FC = () => (
  <SkeletonRect className="aspect-[2/3] rounded" />
);

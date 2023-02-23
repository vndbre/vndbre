import type { FC } from 'react';
import { PosterSkeleton } from '../Poster/PosterSkeleton';
import { SkeletonText } from '../Skeleton/SkeletonText';

/** Skeleton component for card. */
export const CardSkeleton: FC = () => (
  <div className="flex flex-col gap-1">
    <PosterSkeleton />
    <div>
      <SkeletonText textClassName="text-caption-18" className="w-11/12" />
      <SkeletonText textClassName="text-caption-18" className="w-8/12" />
    </div>
  </div>
);

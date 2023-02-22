import type { FC } from 'react';
import { PosterSkeleton } from '../Poster/PosterSkeleton';
import { Skeleton } from '../Skeleton/Skeleton';

/** Skeleton component for card. */
export const CardSkeleton: FC = () => (
  <div className="flex flex-col gap-2.5">
    <PosterSkeleton />
    <Skeleton className="rounded-xs h-3.5 w-11/12 text-sm" />
    <Skeleton className="rounded-xs h-3.5 w-8/12 text-sm" />
  </div>
);

import type { FC } from 'react';
import { PosterSkeleton } from '../Poster/PosterSkeleton';
import { Skeleton } from '../Skeleton/Skeleton';

/** Skeleton component for card. */
export const CardSkeleton: FC = () => (
  <div className="flex flex-col gap-1">
    <PosterSkeleton />
    <Skeleton className="h-4 w-full rounded text-sm" />
  </div>
);

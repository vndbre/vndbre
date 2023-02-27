import type { FC } from 'react';
import { PosterSkeleton } from '../Poster/PosterSkeleton';
import { Skeleton } from '../Skeleton/Skeleton';

/** Skeleton component for card. */
export const CardSkeleton: FC = () => (
  <div className="flex flex-col gap-1">
    <PosterSkeleton />
    <div>
      <Skeleton
        type="text"
        textClassName="text-caption-18"
        linesCount={2}
        lineWidths={[95, 70]}
      />
    </div>
  </div>
);

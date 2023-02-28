import type { FC } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';

/** Skeleton for poster component. */
export const PosterSkeleton: FC = () => (
  <Skeleton type="rect" className="aspect-[2/3] rounded" />
);

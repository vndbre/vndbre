import clsx from 'clsx';
import type { FC } from 'react';
import { memo } from 'react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import { SkeletonRect } from './SkeletonRect';

/** Text-line skeleton props. */
export interface SkeletonTextLineProps {

  /** Tailwind class for the text. */
  readonly textClassName?: 'text-caption-18';

  /** Line width in percent. */
  readonly width?: number;
}

type Props =
& PropsWithClass
& SkeletonTextLineProps;

/** Text-line skeleton component. */
const SkeletonTextLineComponent: FC<Props> = ({
  className,
  textClassName = 'text-caption-18',
  width = 100,
}) => (
  <div
    className={clsx('relative flex items-stretch', textClassName, className)}
    style={{ width: `${width}%` }}
  >
    {/* Required for element to take `height` from the `line-height`. */}
    <span className="text-transparent">a</span>
    <SkeletonRect
      className="rounded-xs absolute inset-0 top-[23%] h-[55%] w-full"
    />
  </div>
);

export const SkeletonTextLine = memo(SkeletonTextLineComponent);

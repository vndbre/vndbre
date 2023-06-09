import type { FC } from 'react';
import { memo } from 'react';
import type { PropsWithClass } from '@/types/propsWithClass';
import { randomBetween } from '@/utils/randomBetween';
import type { SkeletonTextLineProps } from './SkeletonTextLine';
import { SkeletonTextLine } from './SkeletonTextLine';

/**
 * Get list of random line widths.
 * @param count Count.
 */
const getRandomLineWidths = (count: number): number[] => Array
  .from({ length: count })
  .map(() => randomBetween(75, 100));

type Props =
& PropsWithClass
& Pick<SkeletonTextLineProps, 'textClassName'>
& {

  /** Line count. */
  readonly linesCount?: number;

  /** Each line width in percent. */
  readonly lineWidths?: readonly number[];
};

/** Text skeleton component. */
const SkeletonTextComponent: FC<Props> = ({
  className,
  textClassName,
  linesCount = 1,
  lineWidths = getRandomLineWidths(linesCount),
}) => {
  if (linesCount <= 1) {
    return (
      <SkeletonTextLine
        textClassName={textClassName}
        className={className}
        width={lineWidths[0]}
      />
    );
  }

  return (
    <div className={className}>
      {lineWidths.map((width, index) => (
        <SkeletonTextLine
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          textClassName={textClassName}
          width={width}
        />
      ))}
    </div>

  );
};

export const SkeletonText = memo(SkeletonTextComponent);

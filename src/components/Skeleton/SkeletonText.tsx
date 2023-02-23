import type { FC } from 'react';
import { memo } from 'react';
import type { PropsWithChildrenAndClass } from 'src/utils/PropsWithClass';
import type { SkeletonTextLineProps } from './SkeletonTextLine';
import { SkeletonTextLine } from './SkeletonTextLine';

type Props =
& PropsWithChildrenAndClass
& SkeletonTextLineProps
& {
  readonly linesCount?: number;
};

/** Text skeleton component. */
const SkeletonTextComponent: FC<Props> = ({
  className,
  textClassName,
  linesCount = 1,
}) => {
  if (linesCount <= 1) {
    return <SkeletonTextLine textClassName={textClassName} className={className} />;
  }

  return (
    <div>
      {/* TODO: Add line width randomness. */}
      {Array.from({ length: linesCount }).fill(0)
        .map((_value, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SkeletonTextLine key={index} textClassName={textClassName} className={className} />
        ))}
    </div>

  );
};

export const SkeletonText = memo(SkeletonTextComponent);

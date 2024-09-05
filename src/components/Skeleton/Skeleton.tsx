import type { ComponentProps } from 'react';
import { typedMemo } from '@/api/utils/typedMemo';
import { SkeletonRect } from './SkeletonRect';
import { SkeletonText } from './SkeletonText';
import { SkeletonTextLine } from './SkeletonTextLine';

const commonProps = { 'aria-hidden': true };

type SkeletonType = 'rect' | 'text' | 'text-line';

type Props<Type extends SkeletonType = 'rect'> =
& {

  /** Skeleton type. */
  readonly type: Type;
}
& ComponentProps<
  Type extends 'rect'
    ? typeof SkeletonRect
    : Type extends 'text'
      ? typeof SkeletonText
      : typeof SkeletonTextLine
>;

/** Skeleton component. */
const SkeletonComponent = <T extends SkeletonType>({ type, ...props }: Props<T>): JSX.Element => {
  if (type === 'text') {
    return <SkeletonText {...commonProps} {...props} />;
  }
  if (type === 'text-line') {
    return <SkeletonTextLine {...commonProps} {...props} />;
  }
  return <SkeletonRect {...commonProps} {...props} />;
};

export const Skeleton = typedMemo(SkeletonComponent);

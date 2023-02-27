import type { ComponentProps } from 'react';
import React from 'react';
import { typedMemo } from 'src/api/utils/typedMemo';
import { SkeletonRect } from './SkeletonRect';
import { SkeletonText } from './SkeletonText';
import { SkeletonTextLine } from './SkeletonTextLine';

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
  const commonProps = { 'aria-hidden': true };

  if (type === 'text') {
    return <SkeletonText {...commonProps} {...props} />;
  }
  if (type === 'text-line') {
    return <SkeletonTextLine {...commonProps} {...props} />;
  }
  return <SkeletonRect {...commonProps} {...props} />;
};

export const Skeleton = typedMemo(SkeletonComponent);

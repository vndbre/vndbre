import clsx from 'clsx';
import Image from 'next/image';
import type { ComponentProps, FC } from 'react';
import React, { memo } from 'react';

export const POSTER_RATIO = 2 / 3;

type ImageProps = ComponentProps<typeof Image>;

type Props =
& ImageProps
& {

  /** Image height, if width isn't provided will use aspect ratio. */
  readonly height?: number;

  /** Image height, if height isn't provided will use aspect ratio. */
  readonly width?: number;
};

/**
 * Image poster.
 */
const PosterComponent: FC<Props> = ({ className, height, width, ...props }) => (
  <div
    className={clsx('relative aspect-[2/3]', className)}
    style={{
      height: height ?? (width ?? 0) / POSTER_RATIO,
      width: width ?? (height ?? 0) * POSTER_RATIO,
    }}
  >
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image
      className={clsx(
        'rounded object-cover outline outline-1 -outline-offset-1 outline-black/10',
      )}
      {...props}
      fill
    />
  </div>
);

export const Poster = memo(PosterComponent);

import clsx from 'clsx';
import Image from 'next/image';
import type { ComponentProps, FC } from 'react';
import React, { memo } from 'react';

type ImageProps = ComponentProps<typeof Image>;

/**
 * Image poster.
 */
const PosterComponent: FC<ImageProps> = ({ className, ...props }) => (
  <div className={clsx('relative aspect-[2/3]', className)}>
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

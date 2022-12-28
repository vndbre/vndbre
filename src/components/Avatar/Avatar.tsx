import clsx from 'clsx';
import type { FC } from 'react';
import React, { memo } from 'react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';

/** Avatar placeholder. */
const AvatarComponent: FC<PropsWithClass> = ({ className }) => (
  <div
    className={clsx(
      'flex w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9900] to-[#AD00FF]',
      className,
    )}
  />
);

export const Avatar = memo(AvatarComponent);

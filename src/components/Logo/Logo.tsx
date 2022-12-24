import type { FC } from 'react';
import React, { memo } from 'react';

/** Logo. */
const LogoComponent: FC = () => (
  <div className="text-lg leading-none font-bold pb-1">vndbre</div>
);

export const Logo = memo(LogoComponent);

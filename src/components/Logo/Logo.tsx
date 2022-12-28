import type { FC } from 'react';
import React, { memo } from 'react';

/** Logo. */
const LogoComponent: FC = () => (
  <div className="pb-1 text-lg font-bold leading-none">vndbre</div>
);

export const Logo = memo(LogoComponent);

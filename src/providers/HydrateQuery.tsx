'use client';

import type { HydrateProps } from '@tanstack/react-query';
import { Hydrate } from '@tanstack/react-query';
import type { FC } from 'react';

export const HydrateQueryProvider: FC<HydrateProps> = ({ children, ...props }) => (
  <Hydrate {...props}>{children}</Hydrate>
);

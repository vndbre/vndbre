'use client';

import type { HydrateProps } from '@tanstack/react-query';
import { Hydrate } from '@tanstack/react-query';

export const HydrateQueryProvider = ({ children, ...props }: HydrateProps) => (
  <Hydrate {...props}>{children}</Hydrate>
);

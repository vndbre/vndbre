'use client';

import createCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import type { FC, PropsWithChildren } from 'react';

const cache = createCache({
  key: 'react-select-cache',
  prepend: true,
});

export const CacheProvider: FC<PropsWithChildren> = ({ children }) => (
  <EmotionCacheProvider value={cache}>
    {children}
  </EmotionCacheProvider>
);

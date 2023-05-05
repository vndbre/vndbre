'use client';

import createCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import type { PropsWithChildren } from 'react';

const cache = createCache({
  key: 'react-select-cache',
  prepend: true,
});

export const CacheProvider = ({ children }: PropsWithChildren) => (
  <EmotionCacheProvider value={cache}>
    {children}
  </EmotionCacheProvider>
);

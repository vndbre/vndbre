import { type AppType } from 'next/dist/shared/lib/utils';
import { Inter } from '@next/font/google';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import 'src/styles/globals.css';
import { queryClient } from '../api/queryClient';

/**
 * Used to change default behavior of placing styles in the end of head tag.
 * That behavior ruins classes specificity hence we're unable to properly use tailwind.
 * Emotion is used in `react-select`.
 */
const cache = createCache({
  key: 'react-select-cache',
  prepend: true,
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
});

/** App. */
const MyApp: AppType<{ dehydratedState: unknown; }> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <CacheProvider value={cache}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </CacheProvider>
  </QueryClientProvider>
);

export default MyApp;

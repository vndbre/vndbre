import { type AppType } from 'next/dist/shared/lib/utils';
import { Inter } from '@next/font/google';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'src/styles/globals.css';
import { queryClient } from '../api/queryClient';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
});

/** App. */
const MyApp: AppType<{ dehydratedState: unknown; }> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </Hydrate>
  </QueryClientProvider>
);

export default MyApp;

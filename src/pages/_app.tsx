import { type AppType } from 'next/dist/shared/lib/utils';
import { Inter } from '@next/font/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../styles/globals.css';
import { useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
});

/** App. */
const MyApp: AppType<{ dehydratedState: unknown; }> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;

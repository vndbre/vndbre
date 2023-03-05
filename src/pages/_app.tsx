import { Inter } from '@next/font/google';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import 'src/styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { INITIAL_SETTINGS, settingsAtom, SETTINGS_KEY } from 'src/store/settingsAtom';
import type { Settings } from 'src/api/models/settings/settings';
import { CookieStorage } from 'src/store/utils/cookieStorage';
import { Provider } from 'jotai';
import { HydrateAtoms } from 'src/store/HydrateAtoms';
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

type Props =
& AppProps<{ dehydratedState: unknown; session: Session | null; }>
& { settings: Settings; };

/** App. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  settings,
}: Props) => (
  <SessionProvider session={session}>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={cache}>
          <HydrateAtoms values={[[settingsAtom, settings]]}>
            <Hydrate state={pageProps.dehydratedState}>
              <div className={`${inter.variable} font-sans`}>
                <Component {...pageProps} />
              </div>
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </HydrateAtoms>
        </CacheProvider>
      </QueryClientProvider>
    </Provider>
  </SessionProvider>
);

/**
 * Gets initial props for app.
 * @param context App context.
 */
MyApp.getInitialProps = async(context: AppContext) => {
  const props = await App.getInitialProps(context);
  const displaySettings = CookieStorage.getCookieValue(
    SETTINGS_KEY, INITIAL_SETTINGS, context.ctx.req,
  );
  return { ...props, settings: displaySettings };
};

export default MyApp;

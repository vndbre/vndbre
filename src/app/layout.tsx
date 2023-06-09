import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { QueryProvider } from '@/providers/QueryProvider';
import { cookies, headers } from 'next/headers';

import '@/styles/globals.css';
import { CacheProvider } from '@/providers/CacheProvider';
import { CookieStorage } from '@/store/utils/cookieStorage';
import { INITIAL_SETTINGS, SETTINGS_KEY } from '@/store/settingsAtomConfig';
import { HydrateAtomsProvider } from '@/providers/HydrateAtomsProvider';
import type { Settings } from '@/api/models/settings/settings';
import { JotaiProvider } from '@/providers/JotaiProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/authOptions';
import { AuthProvider } from '@/providers/AuthProvider';
import { UAParser } from 'ua-parser-js';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const RootLayout = async({ children }: PropsWithChildren) => {
  const cookieStore = cookies();
  const settings = CookieStorage.getCookieValue<Settings>(
    SETTINGS_KEY,
    INITIAL_SETTINGS,
    cookieStore,
  );

  const headerStore = headers();
  const userAgent = headerStore.get('user-agent');
  const { device: { type } } = UAParser(userAgent ?? undefined);
  const isMobile = type === 'mobile' || type === 'tablet';

  const atomValues = { settings, isMobile };

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body className={`${inter.variable} bg-surface-1 font-sans text-on-surface`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider session={session}>
            <QueryProvider>
              <JotaiProvider>
                <HydrateAtomsProvider values={atomValues}>
                  <CacheProvider>
                    <div className="flex flex-col items-center gap-6">
                      <AppHeader />
                      <div className="w-full max-w-screen-xl px-6">
                        {children}
                      </div>
                    </div>
                  </CacheProvider>
                </HydrateAtomsProvider>
              </JotaiProvider>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

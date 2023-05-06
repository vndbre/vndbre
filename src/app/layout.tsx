import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { AppHeader } from 'src/components/AppHeader/AppHeader';
import { QueryProvider } from 'src/providers/QueryProvider';
import { cookies } from 'next/headers';

import 'src/styles/globals.css';
import { CacheProvider } from 'src/providers/CacheProvider';
import { CookieStorage } from 'src/store/utils/cookieStorage';
import { INITIAL_SETTINGS, SETTINGS_KEY } from 'src/store/settingsAtomConfig';
import { HydrateAtomsProvider } from 'src/providers/HydrateAtomsProvider';
import type { Settings } from 'src/api/models/settings/settings';
import { JotaiProvider } from 'src/providers/JotaiProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from 'src/api/authOptions';
import { AuthProvider } from 'src/providers/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
});

const RootLayout = async({ children }: PropsWithChildren) => {
  const cookieStore = cookies();
  const settings = CookieStorage.getCookieValue<Settings>(
    SETTINGS_KEY,
    INITIAL_SETTINGS,
    cookieStore.get(SETTINGS_KEY),
  );

  const session = await getServerSession(authOptions);

  const atomValues = { settings, isMobile: false };

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
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
      </body>
    </html>
  );
};

export default RootLayout;

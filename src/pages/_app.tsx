import { type AppType } from 'next/dist/shared/lib/utils';
import { Inter } from '@next/font/google';

import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
});

/** App. */
const MyApp: AppType = ({ Component, pageProps }) => (
  <div className={`${inter.variable} font-sans`}>
    <Component {...pageProps} />
  </div>
);

export default MyApp;

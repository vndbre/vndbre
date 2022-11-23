import { type AppType } from "next/dist/shared/lib/utils";
import { Inter } from '@next/font/google'

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <div className={`${inter.variable} font-sans`}><Component {...pageProps} /></div>;
};

export default MyApp;

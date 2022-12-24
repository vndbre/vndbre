import Head from 'next/head';
import type { FC } from 'react';
import { VnHeader } from './components/VnHeader/VnHeader';

/** Visual novel. */
export const Vn: FC = () => {
  const titleEnglish = 'Idol Mahou Shoujo Chiruchiru ☆ Michiru';
  return (
    <>
      <Head>
        <title>
          {titleEnglish}
          {' '}
          | vndbre
        </title>
        <meta name="description" content="vndbre" />
      </Head>
      <VnHeader
        titleEnglish={titleEnglish}
        titleRomaji="アイドル魔法少女ちるちる☆みちる"
      />
    </>
  );
};

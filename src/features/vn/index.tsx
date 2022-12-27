import Head from 'next/head';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import type { FC, PropsWithChildren } from 'react';
import { memo, useEffect } from 'react';
import type { TabItem } from '../../components/Tabs/Tabs';
import { VnHeader } from './components/VnHeader/VnHeader';

/**
 * Checks if current route is freshly loaded and not navigated from other route.
 * @param router Router.
 */
const checkInitialRoute = (router: NextRouter): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components = (router as any).components as any as Record<string, { initial?: boolean; }>;
  return components?.[router.route]?.initial ?? false;
};

interface Props {

  /** Tab change callback. */
  readonly onTabChange: (tabName: TabItem['name']) => void;
}

/** Visual novel. */
export const VnComponent: FC<PropsWithChildren<Props>> = ({ children, onTabChange }) => {
  const titleEnglish = 'Idol Mahou Shoujo Chiruchiru ☆ Michiru';
  const titleRomaji = 'アイドル魔法少女ちるちる☆みちる';
  // eslint-disable-next-line max-len
  const posterSrc = 'https://sun9-32.userapi.com/impg/WZejBGodtD7duTRu2Zfp2n_y6srbAbHn-Yuygg/XCh4MvxS0bs.jpg?size=1200x1500&quality=96&sign=45572ad876700fb321b42e9ce77c86dc';

  const pageTitle = `${titleEnglish} | vndbre`;

  const router = useRouter();
  const activeTabName = router.route.split('/').at(-1) as TabItem['name'];

  const isInitialRoute = checkInitialRoute(router);

  useEffect(() => {
    console.log('mounted');
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="vndbre" />
      </Head>
      <VnHeader
        titleEnglish={titleEnglish}
        titleRomaji={titleRomaji}
        posterSrc={posterSrc}
        activeTabName={activeTabName}
        onTabChange={onTabChange}
        hasTransitionAnimations={!isInitialRoute}
      />
      {children}
    </>
  );
};

export const Vn = memo(VnComponent);

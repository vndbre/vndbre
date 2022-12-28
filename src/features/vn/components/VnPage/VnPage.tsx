import Head from 'next/head';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import { useRouterLoading } from '../../../../hooks/useRouterLoading';
import { VnHeader } from '../VnHeader/VnHeader';

/**
 * Checks if current route is freshly loaded and not navigated from other route.
 * @param router Router.
 */
const checkInitialRoute = (router: NextRouter): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components = (router as any).components as any as Record<string, { initial?: boolean; }>;
  return components?.[router.route]?.initial ?? false;
};

/** Visual novel. */
export const VnPageComponent: FC<PropsWithChildren> = ({
  children,
}) => {
  const titleEnglish = 'Idol Mahou Shoujo Chiruchiru ☆ Michiru';
  const titleRomaji = 'アイドル魔法少女ちるちる☆みちる';
  // eslint-disable-next-line max-len
  const posterSrc = 'https://sun9-32.userapi.com/impg/WZejBGodtD7duTRu2Zfp2n_y6srbAbHn-Yuygg/XCh4MvxS0bs.jpg?size=1200x1500&quality=96&sign=45572ad876700fb321b42e9ce77c86dc';

  const pageTitle = `${titleEnglish} | vndbre`;

  const router = useRouter();

  const isInitialRoute = checkInitialRoute(router);

  const isRouterLoading = useRouterLoading();

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
        hasTransitionAnimations={!isInitialRoute}
      />
      {isRouterLoading ? (
        <div>loading</div>
      ) : (
        children
      )}
    </>
  );
};

export const VnPage = memo(VnPageComponent);

import Head from 'next/head';
import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import { useIsInitialRoute } from 'src/hooks/useIsInitialRoute';
import { useRouterLoading } from 'src/hooks/useRouterLoading';
import { VnHeader } from '../VnHeader/VnHeader';

/** Visual novel. */
export const VnPageComponent: FC<PropsWithChildren> = ({
  children,
}) => {
  const titleEnglish = 'Idol Mahou Shoujo Chiruchiru ☆ Michiru';
  const titleRomaji = 'アイドル魔法少女ちるちる☆みちる';
  // eslint-disable-next-line max-len
  const posterSrc = 'https://sun9-32.userapi.com/impg/WZejBGodtD7duTRu2Zfp2n_y6srbAbHn-Yuygg/XCh4MvxS0bs.jpg?size=1200x1500&quality=96&sign=45572ad876700fb321b42e9ce77c86dc';

  const pageTitle = `${titleEnglish} | vndbre`;

  const isInitialRoute = useIsInitialRoute();
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

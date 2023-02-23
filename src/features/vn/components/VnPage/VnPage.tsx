import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import { useIsInitialRoute } from 'src/hooks/useIsInitialRoute';
import { useRouterLoading } from 'src/hooks/useRouterLoading';
import { useVnInfoQuery } from '../../queries/vnInfo';
import { VnHeader } from '../VnHeader/VnHeader';

/** Visual novel. */
export const VnPageComponent: FC<PropsWithChildren> = ({
  children,
}) => {
  const isInitialRoute = useIsInitialRoute();
  const isRouterLoading = useRouterLoading();

  const router = useRouter();
  const { data, isLoading } = useVnInfoQuery(String(router.query.id));

  if (data == null || isLoading) {
    return <div>loading header</div>;
  }

  const pageTitle = `${data.titleEnglish} | vndbre`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="vndbre" />
      </Head>
      <div className="flex flex-col gap-6">
        <VnHeader />
        {isRouterLoading ? (
          <div>loading</div>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export const VnPage = memo(VnPageComponent);

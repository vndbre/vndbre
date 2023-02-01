import { Layout } from 'src/components/Layout/Layout';
import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import { queryClient } from 'src/api/queryClient';

import { VnPage } from '../../components/VnPage/VnPage';
import { VnReleases } from '../../components/VnReleases/VnReleases';
import { releasesQueryOptions } from '../../queries/releases';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  await queryClient.prefetchQuery(releasesQueryOptions);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/** Vn Releases page. */
export const VnReleasesPage: NextPage = () => (
  <Layout>
    <VnPage>
      <VnReleases />
    </VnPage>
  </Layout>
);

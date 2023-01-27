import { Layout } from 'src/components/Layout/Layout';
import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import { dehydrate } from '@tanstack/react-query';
import { queryClient } from 'src/api/queryClient';

import { VnPage } from '../../components/VnPage/VnPage';
import { VnOverview } from '../../components/VnOverview/VnOverview';
import { vnOverviewQueryOptions } from '../../queries/vnOverview';
import { vnInfoQueryOptions } from '../../queries/vnInfo';

/**
 * Get server side props.
 * @param context Context.
 */
export const getServerSideProps: GetServerSideProps = async context => {
  await queryClient.prefetchQuery(vnOverviewQueryOptions(String(context.query.id)));
  await queryClient.prefetchQuery(vnInfoQueryOptions(String(context.query.id)));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/** Vn Overview page. */
export const VnOverviewPage: NextPage = () => (
  <Layout>
    <VnPage>
      <VnOverview />
    </VnPage>
  </Layout>
);

import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import { dehydrate } from '@tanstack/react-query';
import VnOverview from 'src/features/vn/pages/VnOverviewPage/VnOverviewPage';
import { queryClient } from 'src/api/queryClient';
import { vnInfoQueryOptions } from 'src/features/vn/queries/vnInfo';
import { vnOverviewQueryOptions } from 'src/features/vn/queries/vnOverview';

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
const VnOverviewPage: NextPage = () => (
  <VnOverview />
);

export default VnOverviewPage;

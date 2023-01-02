import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import { dehydrate } from '@tanstack/react-query';
import VnOverview from 'src/features/vn/pages/VnOverviewPage/VnOverviewPage';
import { queryClient } from 'src/api/queryClient';
import { vnInfoQueryOptions } from 'src/features/vn/queries/vnInfo';
import { vnOverviewQueryOptions } from 'src/features/vn/queries/vnOverview';
import { vnListQueryOptions } from 'src/features/vn/queries/vnList';

/**
 * Get server side props.
 * @param context Context.
 */
export const getServerSideProps: GetServerSideProps = async context => {
  await queryClient.prefetchQuery(vnOverviewQueryOptions(Number(context.query.id)));
  await queryClient.prefetchQuery(vnInfoQueryOptions(Number(context.query.id)));
  await queryClient.prefetchQuery(vnListQueryOptions({}));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/** Vn Overview page. */
const VnSearchPage: NextPage = () => (
  <VnOverview />
);

export default VnSearchPage;

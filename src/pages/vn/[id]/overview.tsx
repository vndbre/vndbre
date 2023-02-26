import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { queryClient } from 'src/api/queryClient';
import { VnOverviewPage } from 'src/features/vn/pages/VnOverviewPage/VnOverviewPage';
import { vnInfoQueryOptions } from 'src/features/vn/queries/vnInfo';
import { vnOverviewQueryOptions } from 'src/features/vn/queries/vnOverview';
import { nullify } from 'src/api/utils/nullify';

/**
 * Get server side props.
 * @param context Context.
 */
export const getServerSideProps: GetServerSideProps = async context => {
  await queryClient.prefetchQuery(vnOverviewQueryOptions(String(context.query.id)));
  await queryClient.prefetchQuery(vnInfoQueryOptions(String(context.query.id)));

  return {
    props: {
      // Workaround for https://github.com/TanStack/query/issues/1458
      dehydratedState: nullify(dehydrate(queryClient)),
    },
  };
};

export default VnOverviewPage;

import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { queryClient } from 'src/api/queryClient';
import { VnSearchPage } from 'src/features/search';
import { getBaseTagsQueryOptions } from 'src/features/search/queries/tag';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  await queryClient.prefetchInfiniteQuery(getBaseTagsQueryOptions({}));
  return {
    props: {
      // Workaround for https://github.com/TanStack/query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default VnSearchPage;

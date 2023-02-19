import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { queryClient } from 'src/api/queryClient';
import { VnSearchPage } from 'src/features/search';
import { VnSearchFormValues } from 'src/features/search/components/VnSearchForm/vnSearchFormValues';
import { getBaseTagsQueryOptions } from 'src/features/search/queries/tag';
import { getBaseVnsQueryOptions } from 'src/features/search/queries/vns';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  await queryClient.prefetchInfiniteQuery(getBaseTagsQueryOptions({}));
  await queryClient.prefetchInfiniteQuery(
    getBaseVnsQueryOptions(VnSearchFormValues.toQueryOptions()),
  );

  return {
    props: {
      // Workaround for https://github.com/TanStack/query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default VnSearchPage;

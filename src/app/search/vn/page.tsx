import { dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/api/getQueryClient';
import { VnSearch } from '@/features/search/components/VnSearch/VnSearch';
import { VnSearchFormValues } from '@/features/search/components/VnSearchForm/vnSearchFormValues';
import { getBaseTagsQueryOptions } from '@/features/search/queries/tags';
import { getBaseVnsQueryOptions } from '@/features/search/queries/vns';
import { HydrateQueryProvider } from '@/providers/HydrateQuery';

const VnSearchPage = async() => {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchInfiniteQuery(getBaseTagsQueryOptions({})),
    queryClient.prefetchInfiniteQuery(
      getBaseVnsQueryOptions(VnSearchFormValues.toQueryOptions()),
    ),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateQueryProvider state={dehydratedState}>
      <VnSearch />
    </HydrateQueryProvider>
  );
};

export default VnSearchPage;

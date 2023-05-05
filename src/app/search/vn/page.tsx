import { dehydrate } from '@tanstack/react-query';
import getQueryClient from 'src/api/getQueryClient';
import { VnSearch } from 'src/features/search/components/VnSearch/VnSearch';
import { VnSearchFormValues } from 'src/features/search/components/VnSearchForm/vnSearchFormValues';
import { getBaseTagsQueryOptions } from 'src/features/search/queries/tags';
import { getBaseVnsQueryOptions } from 'src/features/search/queries/vns';
import { HydrateQueryProvider } from 'src/providers/HydrateQuery';

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

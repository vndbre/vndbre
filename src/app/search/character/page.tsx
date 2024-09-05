import { dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/api/getQueryClient';
import { CharacterSearch } from '@/features/search/components/CharacterSearch/CharacterSearch';
import { CharacterSearchFormValues } from '@/features/search/components/CharacterSearchForm/characterSearchFormValues';
import { getBaseCharactersQueryOptions } from '@/features/search/queries/characters';
import { getBaseTraitsQueryOptions } from '@/features/search/queries/traits';
import { getBaseVnsQueryOptions } from '@/features/search/queries/vns';
import { HydrateQueryProvider } from '@/providers/HydrateQuery';

const CharacterSearchPage = async() => {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchInfiniteQuery(
      getBaseCharactersQueryOptions(
        CharacterSearchFormValues.toQueryOptions(),
      ),
    ),
    queryClient.prefetchInfiniteQuery(
      getBaseTraitsQueryOptions({}),
    ),
    queryClient.prefetchInfiniteQuery(
      getBaseVnsQueryOptions({ search: '' }),
    ),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateQueryProvider state={dehydratedState}>
      <CharacterSearch />
    </HydrateQueryProvider>
  );
};

export default CharacterSearchPage;

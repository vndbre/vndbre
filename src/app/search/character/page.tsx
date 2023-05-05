import { dehydrate } from '@tanstack/react-query';
import getQueryClient from 'src/api/getQueryClient';
import { CharacterSearch } from 'src/features/search/components/CharacterSearch/CharacterSearch';
import { CharacterSearchFormValues } from 'src/features/search/components/CharacterSearchForm/characterSearchFormValues';
import { getBaseCharactersQueryOptions } from 'src/features/search/queries/characters';
import { getBaseTraitsQueryOptions } from 'src/features/search/queries/traits';
import { getBaseVnsQueryOptions } from 'src/features/search/queries/vns';
import { HydrateQueryProvider } from 'src/providers/HydrateQuery';

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

import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { queryClient } from 'src/api/queryClient';
import { CharacterSearchFormValues } from 'src/features/search/components/CharacterSearchForm/characterSearchFormValues';
import { CharacterSearchPage } from 'src/features/search/pages/CharacterSearchPage/CharacterSearchPage';
import { getBaseCharactersQueryOptions } from 'src/features/search/queries/characters';
import { getBaseVnsQueryOptions } from 'src/features/search/queries/vns';
import { nullify } from 'src/api/utils/nullify';
import { getBaseTraitsQueryOptions } from 'src/features/search/queries/traits';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
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

  return {
    props: {
      dehydratedState: nullify(dehydrate(queryClient)),
    },
  };
};

export default CharacterSearchPage;

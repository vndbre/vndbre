import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { CharacterSearchOptions, CharactersService } from '../../../api/services/charactersService';
import { Character } from '../../../models/characters/character';
import { Pagination } from '../../../models/pagination';
import { VisualNovel } from '../../../models/visualNovels/visualNovel';

/**
 * Hook for fetching characters by vn id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useCharactersQuery = (
  id: VisualNovel['id'],
  options?: QueryObserverOptions<Character[], Error>,
): UseQueryResult<Character[], Error> =>
  useQuery(['characters', id],
    () => CharactersService.fetchCharactersByVnId(id),
    {
      ...options,
    });

/**
 * Hook for fetching page of characters.
 * @param searchOptions Search options.
 */
export const useCharactersPageQuery = (searchOptions: CharacterSearchOptions): UseQueryResult<Pagination<Character>, Error> =>
  useQuery(
    ['charactersPage', searchOptions],
    () => CharactersService.fetchPaginatedCharacters(searchOptions),
  );

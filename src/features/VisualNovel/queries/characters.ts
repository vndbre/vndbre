import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { CharactersService } from '../../../api/services/charactersService';
import { Character } from '../../../models/characters/character';
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

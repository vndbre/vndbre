import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { CharacterService } from '../../../api/services/characterService';
import { Character } from '../../../models/character';
import { VisualNovel } from '../../../models/visualNovel';

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
    () => CharacterService.fetchCharactersByVnId(id),
    {
      staleTime: defaultStaleTime,
      ...defaultFetchStrategy,
      ...options,
    });

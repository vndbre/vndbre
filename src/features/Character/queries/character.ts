import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { CharactersService } from '../../../api/services/charactersService';
import { Character } from '../../../models/characters/character';
import { defaultStaleTime, defaultFetchStrategy } from './config';

/**
 * Gets character by its id.
 * @param id Character id.
 * @param options Query options.
 */
export const useCharacterQuery = (
  id: Character['id'],
  options?: QueryObserverOptions<Character, Error>,
): UseQueryResult<Character, Error> =>
  useQuery(['character', id], () => CharactersService.fetchCharacterById(id), {
    staleTime: defaultStaleTime,
    ...defaultFetchStrategy,
    ...options,
  });

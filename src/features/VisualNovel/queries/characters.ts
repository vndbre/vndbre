import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { fetchCharacters } from '../../../api/services/characterService';
import { Character } from '../../../models/character';

/**
 * Hook for fetching characters by vn id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useCharactersQuery = (id: string, options?: QueryObserverOptions<Character[], Error>): UseQueryResult<Character[], Error> =>
  useQuery(['characters', id], () => fetchCharacters(id), { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });

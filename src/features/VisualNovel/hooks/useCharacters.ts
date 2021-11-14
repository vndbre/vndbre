import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { fetchCharacters } from '../../../api/services/characterService';
import { Character } from '../../../models/character';

/**
 * Hook for fetching characters by vn id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useCharacters = (id: string, options: QueryObserverOptions<Character[], Error> = {}): UseQueryResult<Character[], Error> =>
  useQuery(['character', id], () => fetchCharacters(id), options);

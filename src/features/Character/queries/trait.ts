import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { TraitsService } from '../../../api/services/traitsService';
import { CharacterTrait } from '../../../models/characters/characterTrait';
import { TraitsWithRoot } from '../../../models/traitsWithRoot';

/**
 * Hook for fetching character traits.
 * @param id Trait id for query key.
 * @param characterTraits Trait ids.
 * @param options Query options.
 */
export const useTraitsQuery = (
  id: string,
  characterTraits: readonly CharacterTrait[],
  options?: QueryObserverOptions<TraitsWithRoot, Error>,
): UseQueryResult<TraitsWithRoot, Error> =>
  useQuery(
    ['traits', id],
    () => TraitsService.fetchTraits(characterTraits.map(ct => ct.id)),
    { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options },
  );

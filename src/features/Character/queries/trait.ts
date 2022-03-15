import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { TraitsService } from '../../../api/services/traitsService';
import { CharacterTrait } from '../../../models/characters/characterTrait';
import { TraitsWithRoot } from '../../../models/traitsWithRoot';
import { SpoilerLevel } from '../../../models/spoilerLevel';
import { ExtendedTraitsWithRoot } from '../../../models/extendedTraitWithRoot';

/**
 * Extends root traits with spoiler level.
 * @param characterTraits List of character traits.
 */
const extendTraits = async(
  characterTraits: readonly CharacterTrait[],
  traitsWithRoot: Promise<TraitsWithRoot>,
): Promise<ExtendedTraitsWithRoot> => {
  const { traits, rootTraits } = await traitsWithRoot;
  const extendedTraits = traits.map(
    trait => ({ ...trait, spoilerLevel: characterTraits.find(ct => ct.id === trait.id)?.spoilerLevel ?? SpoilerLevel.None }),
  );
  return {
    rootTraits,
    traits: extendedTraits,
  };
};

/**
 * Hook for fetching character traits with its root traits.
 * @param id Trait id for query key.
 * @param characterTraits Trait ids.
 * @param options Query options.
 */
export const useExtendedTraitsQuery = (
  id: string,
  characterTraits: readonly CharacterTrait[],
  options?: QueryObserverOptions<ExtendedTraitsWithRoot, Error>,
): UseQueryResult<ExtendedTraitsWithRoot, Error> =>
  useQuery(
    ['traits', id],
    () => extendTraits(characterTraits, TraitsService.fetchTraits(characterTraits.map(ct => ct.id))),
    { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options },
  );

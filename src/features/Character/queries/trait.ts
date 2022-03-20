import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { TraitsService } from '../../../api/services/traitsService';
import { CharacterTrait } from '../../../models/characters/characterTrait';
import { TraitsWithRoots } from '../../../models/traitsWithRoots';
import { SpoilerLevel } from '../../../models/spoilerLevel';
import { ExtendedTraitsWithRoots } from '../../../models/extendedTraitWithRoots';

/**
 * Extends root traits with spoiler level.
 * @param characterTraits List of character traits.
 */
const extendTraits = async(
  characterTraits: readonly CharacterTrait[],
  traitsWithRoot: Promise<TraitsWithRoots>,
): Promise<ExtendedTraitsWithRoots> => {
  const { traits, rootTraits } = await traitsWithRoot;
  const extendedTraits = traits.map(
    trait => ({
      ...trait,
      spoilerLevel: characterTraits.find(ct => ct.id === trait.id)?.spoilerLevel ?? SpoilerLevel.Major,
    }),
  );
  return {
    rootTraits,
    traits: extendedTraits,
  };
};

/**
 * Hook for fetching character traits with its root traits.
 * @param id Trait id for query key.
 * @param characterTraits List of character traits.
 * @param options Query options.
 */
export const useExtendedTraitsQuery = (
  id: string,
  characterTraits: readonly CharacterTrait[],
  options?: QueryObserverOptions<ExtendedTraitsWithRoots, Error>,
): UseQueryResult<ExtendedTraitsWithRoots, Error> =>
  useQuery(
    ['traits', id],
    () => extendTraits(characterTraits, TraitsService.fetchTraits(characterTraits.map(ct => ct.id))),
    { ...options },
  );

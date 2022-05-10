import { http } from '..';
import { ExtendedTrait } from '../../models/extendedTrait';
import { RootTraitName } from '../../models/rootTraitName';
import { Trait } from '../../models/trait';
import { TraitsWithRoots } from '../../models/traitsWithRoots';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';
import { TraitDto } from '../dtos/traitDto';
import { TraitMapper } from '../mappers/traitMapper';

/**
 * Traits service.
 */
export namespace TraitsService {

  /**
   * Fetches traits by given array of ids.
   * @param ids List of ids.
   */
  export async function fetchTraits(ids: readonly Trait['id'][]): Promise<TraitsWithRoots> {
    /**
     * Fetches traits by its ids.
     * @param traitIds List of traits ids.
     */
    async function fetch(traitIds: readonly Trait['id'][]): Promise<TraitDto[]> {
      const { data } = await http.post<TraitDto[]>(
        ApiProxyEndpoints.Traits,
        traitIds,
      );
      return data;
    }
    const traits = await fetch(ids);
    const rootIds = Array.from(new Set(traits.map(trait => trait.root_id).filter(id => id != null)));
    const rootTraits = await fetch(rootIds);
    return {
      traits: traits.map(TraitMapper.fromDto),
      rootTraits: rootTraits.map(TraitMapper.fromDto),
    };
  }

  /**
   * Gets grouped traits by root traits.
   * @param traits List of extended traits.
   * @param rootTraits List of root traits.
   */
  export function getGroupedTraitsByRootTrait(
    traits: readonly ExtendedTrait[],
    rootTraits: readonly Trait[],
  ): Record<RootTraitName, ExtendedTrait[]> {
    const groupedTraits: Record<RootTraitName, ExtendedTrait[]> = {
      [RootTraitName.Hair]: [],
      [RootTraitName.Eyes]: [],
      [RootTraitName.Body]: [],
      [RootTraitName.Clothes]: [],
      [RootTraitName.Items]: [],
      [RootTraitName.Personality]: [],
      [RootTraitName.Role]: [],
      [RootTraitName.EngagesIn]: [],
      [RootTraitName.SubjectOf]: [],
      [RootTraitName.SubjectOfSexual]: [],
      [RootTraitName.EngagesInSexual]: [],
    };
    return rootTraits.reduce((acc, cur) => {
      const relatedTraits = traits.filter(trait => trait.rootId === cur.id);
      return { ...acc, [cur.name]: [...acc[cur.name as RootTraitName], ...relatedTraits] };
    }, groupedTraits);
  }
}

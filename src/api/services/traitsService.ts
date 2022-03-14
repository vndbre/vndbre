import { ApiProxyEndpoints, http } from '..';
import { Trait } from '../../models/trait';
import { TraitsWithRoot } from '../../models/traitsWithRoot';
import { TraitDto } from '../dtos/traitDto';
import { TraitMapper } from '../mappers/traitMapper';

/** Titles of main traits. */
export enum RootTraitTitle {
  Eyes = 'Eyes',
  Hair = 'Hair',
  Body = 'Body',
  Clothes = 'Clothes',
  Items = 'Items',
  Personality = 'Personality',
  Role = 'Role',
  EngagesIn = 'Engages in',
  SubjectOf = 'Subject of',
  EngagesInSexual = 'Engages in (Sexual)',
  SubjectOfSexual = 'Subject of (Sexual)',
}

/**
 * Traits service.
 */
export namespace TraitsService {

  /**
   * Fetches traits by given array of ids.
   * @param ids List of ids.
   */
  export async function fetchTraits(ids: readonly Trait['id'][]): Promise<TraitsWithRoot> {
    /**
     * Fetches traits by its ids.
     * @param traitIds List of traits ids.
     */
    const fetch = async(traitIds: readonly Trait['id'][]): Promise<TraitDto[]> => {
      const { data } = await http.post<TraitDto[]>(
        ApiProxyEndpoints.Traits,
        traitIds,
      );
      return data;
    };
    const traits = await fetch(ids);
    const rootIds = Array.from(new Set(traits.map(trait => trait.root_id)));
    const rootTraits = await fetch(rootIds);
    return {
      traits: traits.map(TraitMapper.fromDto),
      rootTraits: rootTraits.map(TraitMapper.fromDto),
    };
  }
}

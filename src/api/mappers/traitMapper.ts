import { Trait } from '../../models/trait';
import { TraitDto } from '../dtos/traitDto';

export namespace TraitMapper {

  /**
   * Maps `TraitDto` into `Trait` model.
   * @param dto `TraitDto`.
   */
  export function fromDto(dto: TraitDto): Trait {
    return {
      id: dto.id,
      aliases: dto.aliases,
      charactersUsed: dto.chars,
      description: dto.description,
      isApplicable: dto.applicable,
      isMeta: dto.meta,
      isSearchable: dto.searchable,
      name: dto.name,
      parentIds: dto.parents,
      rootId: dto.root_id,
    };
  }
}

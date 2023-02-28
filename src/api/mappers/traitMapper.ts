import type { TraitDto } from '../dtos/traitDto';
import type { Trait } from '../models/trait';

export namespace TraitMapper {

  /**
   * Maps dto to model.
   * @param dto Trait dto.
   */
  export function fromDto(dto: TraitDto): Trait {
    return {
      id: dto.id,
      aliases: dto.aliases,
      description: dto.description,
      parent: dto.group_id === null || dto.group_name === null ? null : {
        id: dto.group_id,
        name: dto.group_name,
      },
      name: dto.name,
      isApplicable: dto.applicable,
      isSearchable: dto.searchable,
    };
  }
}

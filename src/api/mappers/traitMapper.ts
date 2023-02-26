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
      groupId: dto.group_id,
      groupName: dto.group_name,
      name: dto.name,
      isApplicable: dto.applicable,
      isSearchable: dto.searchable,
    };
  }
}

import type { TagDto } from '../dtos/tagDto';
import type { Tag } from '../models/tag';

export namespace TagMapper {

  /**
   * Maps dto to model.
   * @param dto Tag dto.
   */
  export function fromDto(dto: TagDto): Tag {
    return {
      id: dto.id,
      aliases: dto.aliases,
      category: dto.category,
      name: dto.name,
    };
  }
}

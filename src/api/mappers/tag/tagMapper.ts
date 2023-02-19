import type { TagDto } from '../../dtos/tagDto/tagDto';
import type { Tag } from '../../models/tag/tag';
import { TagCategoryMapper } from './tagCategoryMapper';

export namespace TagMapper {

  /**
   * Maps dto to model.
   * @param dto Tag dto.
   */
  export function fromDto(dto: TagDto): Tag {
    return {
      id: dto.id,
      aliases: dto.aliases,
      category: TagCategoryMapper.fromDto(dto.category),
      name: dto.name,
    };
  }
}

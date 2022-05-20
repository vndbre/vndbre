import { Tag } from '../../models/tag';
import { TagClassification } from '../../models/tagClassification';
import { TagDto } from '../dtos/tagDto';

export namespace TagMapper {

  /**
   * Maps dto into model.
   * @param dto Tag dto.
   */
  export function fromDto(dto: TagDto): Tag {
    return {
      id: dto.id,
      name: dto.name,
      aliases: dto.aliases,
      cat: dto.cat as TagClassification,
      isApplicable: dto.applicable,
      isMeta: dto.meta,
      isSearchable: dto.searchable,
      parents: dto.parents,
      visualNovelsCount: dto.vns,
    };
  }
}

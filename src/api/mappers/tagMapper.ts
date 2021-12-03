import { Tag } from '../../models/tag';
import { VisualNovelTag } from '../../models/visualNovel';
import { TagClassification } from '../../utils/types/tagClassification';
import { TagDto } from '../dtos/tagDto';

/**
 * Maps dto into model.
 * @param dto Tag dto.
 */
export const tagFromDto = (dto: TagDto, vnTag: VisualNovelTag): Tag => ({
  id: dto.id,
  name: dto.name,
  aliases: dto.aliases,
  cat: dto.cat as TagClassification,
  isApplicable: dto.applicable,
  isMeta: dto.meta,
  isSearchable: dto.searchable,
  parents: dto.parents,
  visualNovelsCount: dto.vns,
  score: vnTag.score,
  spoilerLevel: vnTag.spoilerLevel,
});

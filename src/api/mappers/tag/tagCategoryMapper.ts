import type { TagCategoryDto } from '@/api/dtos/tagDto/tagCatergoryDto';
import type { TagCategory } from '@/api/models/tag/tagCategory';

const TAG_CATEGORY_FROM_DTO_MAP: Readonly<Record<TagCategoryDto, TagCategory>> = {
  cont: 'content',
  ero: 'erotical',
  tech: 'technical',
};

const TAG_CATEGORY_TO_DTO_MAP: Readonly<Record<TagCategory, TagCategoryDto>> = {
  content: 'cont',
  erotical: 'ero',
  technical: 'tech',
};

export namespace TagCategoryMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: TagCategoryDto): TagCategory {
    return TAG_CATEGORY_FROM_DTO_MAP[dto];
  }

  /**
   * Maps model to dto.
   * @param data Tag category.
   */
  export function toDto(data: TagCategory): TagCategoryDto {
    return TAG_CATEGORY_TO_DTO_MAP[data];
  }
}

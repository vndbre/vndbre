import type { VnTitleDto } from '@/api/dtos/vnDto/titleDto';
import type { LanguageCode } from '@/api/models/language';
import type { VnTitle } from '@/api/models/vn/title';

export namespace VnTitleMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnTitleDto): VnTitle {
    return {
      isMain: dto.main,
      isOfficial: dto.official,
      language: dto.lang as LanguageCode,
      title: dto.title,
      titleLatin: dto.latin,
    };
  }
}

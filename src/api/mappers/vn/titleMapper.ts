import type { VnTitleDto } from 'src/api/dtos/vnDto/titleDto';
import type { LanguageCode } from 'src/api/models/language';
import type { VnTitle } from 'src/api/models/vn/title';

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

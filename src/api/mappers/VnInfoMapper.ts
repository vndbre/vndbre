import type { VnInfoDto } from '../dtos/VnInfoDto';
import type { VnInfo } from '../models/VnInfo';
import { nullable } from '../utils/nullable';

export namespace VnInfoMapper {

  /**
   * Maps vn info from dto.
   * @param dto Vn dto.
   */
  export function fromDto(dto: VnInfoDto): VnInfo {
    return {
      titleEnglish: dto.title,
      titleAlt: nullable(dto.alttitle),
      imageUrl: nullable(dto.image) == null ? null : dto.image.url,
    };
  }
}

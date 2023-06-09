import type { VnScreenshotDto } from '@/api/dtos/vnDto/screenshotDto';
import type { VnScreenshot } from '@/api/models/vn/screenshot';
import { ImageMapper } from '../imageMapper';

export namespace VnScreenshotMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnScreenshotDto): VnScreenshot {
    return {
      ...ImageMapper.fromDto(dto),
      thumbnail: dto.thumbnail,
      thumbnailDimensions: dto.thumbnail_dims,
    };
  }
}

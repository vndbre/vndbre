import type { VnTagDto } from 'src/api/dtos/vnDto/vnTagDto';
import type { VnTag } from 'src/api/models/vn/vnTag';
import { SpoilerLevelMapper } from '../spoilerLevelMapper';
import { TagMapper } from '../tag/tagMapper';

export namespace VnTagMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnTagDto): VnTag {
    return {
      ...TagMapper.fromDto(dto),
      spoilerLevel: SpoilerLevelMapper.fromDto(dto.spoiler),
    };
  }
}

import type { SpoilerLevelDto } from '../dtos/spoilerLevelDto';
import type { SpoilerLevel } from '../models/spoilerLevel';

const SPOILER_LEVEL_FROM_DTO_MAP: Readonly<Record<SpoilerLevelDto, SpoilerLevel>> = {
  0: 'none',
  1: 'minor',
  2: 'major',
};

export namespace SpoilerLevelMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: SpoilerLevelDto): SpoilerLevel {
    return SPOILER_LEVEL_FROM_DTO_MAP[dto];
  }
}

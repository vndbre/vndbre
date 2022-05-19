import { Stats } from '../../models/stats';
import { StatsDto } from '../dtos/statsDto';

/** Stats mapper. */
export namespace StatsMapper {

  /**
   * Maps dto to stats.
   * @param dto Dto object.
   */
  export function fromDto(dto: StatsDto): Stats {
    return {
      releasesTotalAmount: dto.data.releases,
      producersTotalAmount: dto.data.producers,
      charactersTotalAmount: dto.data.chars,
      tagsTotalAmount: dto.data.tags,
      visualNovelsTotalAmount: dto.data.vn,
      traitsTotalAmount: dto.data.traits,
    };
  }
}

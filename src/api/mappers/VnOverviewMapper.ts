import type { VnOverviewDto } from '../dtos/VnOverviewDto';
import type { VnOverview } from '../models/VnOverview';
import { nullable } from '../utils/nullable';

export namespace VnOverviewMapper {

  /**
   * Maps vn overview from dto.
   * @param dto Vn dto.
   */
  export function fromDto(dto: VnOverviewDto): VnOverview {
    return {
      titleEnglish: dto.title,
      imageUrl: nullable(dto.image?.url),
    };
  }
}

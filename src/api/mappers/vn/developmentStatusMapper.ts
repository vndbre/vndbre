import type { VnDevStatusDto } from 'src/api/dtos/vnDto/developmentStatusDto';
import type { VnDevelopmentStatus } from 'src/api/models/vn/developmentStatus';

const DEVSTATUS_FROM_DTO_MAP: Readonly<Record<VnDevStatusDto, VnDevelopmentStatus>> = {
  0: 'cancelled',
  1: 'developing',
  2: 'finished',
};

export namespace VnDevelopmentStatusMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnDevStatusDto): VnDevelopmentStatus {
    return DEVSTATUS_FROM_DTO_MAP[dto];
  }
}

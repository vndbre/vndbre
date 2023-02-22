import type { VnDevStatusDto } from 'src/api/dtos/vnDto/developmentStatusDto';
import type { VnDevelopmentStatus } from 'src/api/models/vn/developmentStatus';

const DEVSTATUS_FROM_DTO_MAP: Readonly<Record<VnDevStatusDto, VnDevelopmentStatus>> = {
  0: 'finished',
  1: 'developing',
  2: 'cancelled',
};

const DEVSTATUS_TO_DTO_MAP: Readonly<Record<VnDevelopmentStatus, VnDevStatusDto>> = {
  finished: 0,
  developing: 1,
  cancelled: 2,
};

export namespace VnDevelopmentStatusMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnDevStatusDto): VnDevelopmentStatus {
    return DEVSTATUS_FROM_DTO_MAP[dto];
  }

  /**
   * Converts dev status to dto.
   * @param data Dev status.
   */
  export function toDto(data: VnDevelopmentStatus): VnDevStatusDto {
    return DEVSTATUS_TO_DTO_MAP[data];
  }
}

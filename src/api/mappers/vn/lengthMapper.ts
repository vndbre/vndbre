import type { VnLengthDto } from 'src/api/dtos/vnDto/lengthDto';
import type { VnLength } from 'src/api/models/vn/length';

const LENGTH_FROM_DTO_MAP: Readonly<Record<VnLengthDto, VnLength>> = {
  1: 'veryshort',
  2: 'short',
  3: 'medium',
  4: 'long',
  5: 'verylong',
};

export namespace VnLengthMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnLengthDto): VnLength {
    return LENGTH_FROM_DTO_MAP[dto];
  }
}

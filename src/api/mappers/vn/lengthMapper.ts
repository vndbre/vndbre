import type { VnLengthDto } from 'src/api/dtos/vnDto/lengthDto';
import type { VnLength } from 'src/api/models/vn/length';

const LENGTH_FROM_DTO_MAP: Readonly<Record<VnLengthDto, VnLength>> = {
  1: 'veryshort',
  2: 'short',
  3: 'medium',
  4: 'long',
  5: 'verylong',
};

const LENGTH_TO_DTO_MAP: Readonly<Record<VnLength, VnLengthDto>> = {
  veryshort: 1,
  short: 2,
  medium: 3,
  long: 4,
  verylong: 5,
};

export namespace VnLengthMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnLengthDto): VnLength {
    return LENGTH_FROM_DTO_MAP[dto];
  }

  /**
   * Maps model to dto.
   * @param data Vn length.
   */
  export function toDto(data: VnLength): VnLengthDto {
    return LENGTH_TO_DTO_MAP[data];
  }
}

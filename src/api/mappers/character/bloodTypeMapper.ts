import type { BloodTypeDto } from '@/api/dtos/characterDto/bloodTypeDto';
import type { BloodType } from '@/api/models/character/bloodType';

export namespace BloodTypeMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: BloodTypeDto): BloodType {
    return dto;
  }
}

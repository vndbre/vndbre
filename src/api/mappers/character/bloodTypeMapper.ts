import type { BloodTypeDto } from 'src/api/dtos/characterDto/bloodTypeDto';
import type { BloodType } from 'src/api/models/character/bloodType';

export namespace BloodTypeMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: BloodTypeDto): BloodType {
    return dto;
  }
}

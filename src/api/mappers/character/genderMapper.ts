import type { GenderDto } from 'src/api/dtos/characterDto/genderDto';
import type { Gender } from 'src/api/models/character/gender';

const GENDER_FROM_DTO_MAP: Readonly<Record<GenderDto, Gender>> = {
  m: 'male',
  f: 'female',
  b: 'both',
};

const GENDER_TO_DTO_MAP: Readonly<Record<Gender, GenderDto>> = {
  male: 'm',
  female: 'f',
  both: 'b',
};

export namespace GenderMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: GenderDto): Gender {
    return GENDER_FROM_DTO_MAP[dto];
  }

  /**
   * Maps model to dto.
   * @param data Gender.
   */
  export function toDto(data: Gender): GenderDto {
    return GENDER_TO_DTO_MAP[data];
  }
}

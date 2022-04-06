import { Gender } from '../../models/gender';
import { GenderDto } from '../dtos/genderDto';

export namespace GenderMapper {
  export const GENDER_FROM_DTO_MAP: Readonly<Record<GenderDto, Gender>> = {
    [GenderDto.Male]: Gender.Male,
    [GenderDto.Female]: Gender.Female,
    [GenderDto.Both]: Gender.Both,
  };
}

import { StaffAlias, Staff } from '../../models/staff';
import { StaffDto } from '../dtos/staffDto';

/**
 * Maps array of arrays of numbers and string to array of objects.
 * @param data Array of arrays.
 * @returns Array of objects.
 */
const staffAliasesFromArray = (data: [number, string, string][]): StaffAlias[] => data.map(alias => ({
  aid: alias[0],
  name: alias[1],
  original: alias[2],
}));

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
export const staffFromDto = (dto: StaffDto): Staff => ({
  id: dto.id,
  name: dto.name,
  gender: dto.gender,
  language: dto.language,
  links: dto.links,
  description: dto.description,
  aliases: staffAliasesFromArray(dto.aliases),
  mainAlias: dto.main_alias,
  visualNovels: dto.vns,
  voiced: dto.voiced,
  original: dto.original,
});

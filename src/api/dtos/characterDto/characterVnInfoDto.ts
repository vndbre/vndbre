import { z } from 'zod';
import { CharacterRoleDtoSchema } from './characterRoleDto';

export const CharacterVnInfoDtoSchema = z.object({
  id: z.string(),
  role: CharacterRoleDtoSchema,
  release: z.object({
    id: z.string(),
  }).nullable(),
});

export type CharacterVnInfoDto = z.infer<typeof CharacterVnInfoDtoSchema>;

import { z } from 'zod';

export const CharacterRoleDtoSchema = z.enum(['main', 'primary', 'side', 'appears']);

export type CharacterRoleDto = z.infer<typeof CharacterRoleDtoSchema>;

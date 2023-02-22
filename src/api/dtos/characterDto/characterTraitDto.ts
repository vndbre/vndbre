import { z } from 'zod';
import { SpoilerLevelDtoSchema } from '../spoilerLevelDto';

export const CharacterTraitDtoSchema = z.object({
  id: z.string(),
  spoiler: SpoilerLevelDtoSchema,
});

export type CharacterTraitDto = z.infer<typeof CharacterTraitDtoSchema>;

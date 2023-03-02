import type { z } from 'zod';
import { SpoilerLevelDtoSchema } from '../spoilerLevelDto';
import { TraitDtoSchema } from '../traitDto';

export const CharacterTraitDtoSchema = TraitDtoSchema.extend({
  spoiler: SpoilerLevelDtoSchema,
});

export type CharacterTraitDto = z.infer<typeof CharacterTraitDtoSchema>;

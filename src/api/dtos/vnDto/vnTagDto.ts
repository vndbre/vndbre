import type { z } from 'zod';
import { SpoilerLevelDtoSchema } from '../spoilerLevelDto';
import { TagDtoSchema } from '../tagDto/tagDto';

export const VnTagDtoSchema = TagDtoSchema.extend({
  spoiler: SpoilerLevelDtoSchema,
});

export type VnTagDto = z.infer<typeof VnTagDtoSchema>;

import { z } from 'zod';

export const SpoilerLevelDtoSchema = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type SpoilerLevelDto = z.infer<typeof SpoilerLevelDtoSchema>;

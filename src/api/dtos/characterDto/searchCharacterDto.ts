import type { z } from 'zod';
import { CharacterDtoSchema } from './characterDto';

export const SearchCharacterDtoSchema = CharacterDtoSchema.pick({
  id: true,
  name: true,
  image: true,
});

export type SearchCharacterDto = z.infer<typeof SearchCharacterDtoSchema>;

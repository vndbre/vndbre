import type { z } from 'zod';
import { VnDtoSchema } from './vnDto';

export const SearchVnDtoSchema = VnDtoSchema.pick({
  id: true,
  image: true,
  title: true,
});

export type SearchVnDto = z.infer<typeof SearchVnDtoSchema>;

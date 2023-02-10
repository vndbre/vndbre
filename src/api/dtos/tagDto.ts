import { z } from 'zod';

export const TagDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.string().array(),
  description: z.string(),
  category: z.enum(['cont', 'tech', 'ero']),
});

export type TagDto = z.infer<typeof TagDtoSchema>;

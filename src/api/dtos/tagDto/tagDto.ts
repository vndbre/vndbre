import { z } from 'zod';
import { TagCategoryDtoSchema } from './tagCatergoryDto';

export const TagDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.string().array(),
  description: z.string(),
  category: TagCategoryDtoSchema,
});

export type TagDto = z.infer<typeof TagDtoSchema>;

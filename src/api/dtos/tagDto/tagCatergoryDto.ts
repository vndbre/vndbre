import { z } from 'zod';

export const TagCategoryDtoSchema = z.enum(['cont', 'tech', 'ero']);

export type TagCategoryDto = z.infer<typeof TagCategoryDtoSchema>;

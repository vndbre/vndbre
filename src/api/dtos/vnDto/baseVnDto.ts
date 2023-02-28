import { z } from 'zod';
import { ImageSchemaDto } from '../imageDto';

export const BaseVnDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: ImageSchemaDto.nullable(),
});

export type BaseVnDto = z.infer<typeof BaseVnDtoSchema>;

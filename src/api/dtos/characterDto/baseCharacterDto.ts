import { z } from 'zod';
import { ImageSchemaDto } from '../imageDto';

export const BaseCharacterDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: ImageSchemaDto.nullable(),
});

export type BaseCharacterDto = z.infer<typeof BaseCharacterDtoSchema>;

import { z } from 'zod';
import { ImageSchemaDto } from '../imageDto';

export const VnScreenshotSchemaDto = ImageSchemaDto.extend({
  thumbnail: z.string().url(),
  thumbnail_dims: z.tuple([z.number(), z.number()]),
});

export type VnScreenshotDto = z.infer<typeof VnScreenshotSchemaDto>;

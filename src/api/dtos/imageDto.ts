import { z } from 'zod';

export const ImageSchemaDto = z.object({
  id: z.string(),
  url: z.string().url(),
  dims: z.tuple([z.number(), z.number()]),
  sexual: z.number().min(0)
    .max(2),
  violence: z.number().min(0)
    .max(2),
  votecount: z.number(),
});

export type ImageDto = z.infer<typeof ImageSchemaDto>;

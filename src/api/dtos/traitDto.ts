import { z } from 'zod';

export const TraitDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  aliases: z.string().array(),
  group_id: z.string().nullable(),
  group_name: z.string().nullable(),
});

export type TraitDto = z.infer<typeof TraitDtoSchema>;

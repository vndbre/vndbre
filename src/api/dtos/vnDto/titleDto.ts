import { z } from 'zod';

export const VnTitleSchemaDto = z.object({
  lang: z.string(),
  title: z.string(),
  latin: z.string().nullable(),
  official: z.boolean(),
  main: z.boolean(),
});

export type VnTitleDto = z.infer<typeof VnTitleSchemaDto>;

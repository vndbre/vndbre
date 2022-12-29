import type { TypeOf } from 'zod';
import { z } from 'zod';

/** Visual novel overview info dto schema. */
export const VnOverviewDtoSchema = z.object({
  /** Main title as displayed on the site, typically romanized from the original script. */
  title: z.string(),

  /** Image. */
  image: z.object({

    /** Url. */
    url: z.string(),
  }).nullable(),
});

export type VnOverviewDto = TypeOf<typeof VnOverviewDtoSchema>;

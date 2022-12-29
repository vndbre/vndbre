import type { TypeOf } from 'zod';
import { z } from 'zod';

/** Visual novel brief info dto schema. */
export const VnInfoDtoSchema = z.object({
  /** Main title as displayed on the site, typically romanized from the original script. */
  title: z.string(),

  /** Alternative title, typically the same as title but in the original script. */
  alttitle: z.string().nullable(),

  /** Image. */
  image: z.object({

    /** Url. */
    url: z.string(),
  }).nullable(),
});

export type VnInfoDto = TypeOf<typeof VnInfoDtoSchema>;

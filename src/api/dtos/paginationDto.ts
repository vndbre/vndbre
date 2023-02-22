import type { TypeOf } from 'zod';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createPaginationDtoSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    /** Total count. */
    count: z.number().optional(),

    /** If there is more data to fetch. */
    more: z.boolean(),

    /** Data. */
    results: schema.array(),
  });
}

export type PaginationDto<T extends z.ZodTypeAny> =
  TypeOf<ReturnType<typeof createPaginationDtoSchema<T>>>;

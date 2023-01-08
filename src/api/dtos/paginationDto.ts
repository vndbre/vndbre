import type { TypeOf } from 'zod';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createPaginationDtoSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    /** Total count. */
    count: z.number(),

    /** If there is more data to fetch. */
    more: z.boolean(),

    /** Current page. */
    page: z.number(),

    /** Data. */
    results: z.array(schema),
  });
}

export type PaginationDto<T extends z.ZodTypeAny> =
  TypeOf<ReturnType<typeof createPaginationDtoSchema<T>>>;

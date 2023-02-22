import { z } from 'zod';

export const VnDevStatusSchemaDto = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type VnDevStatusDto = z.infer<typeof VnDevStatusSchemaDto>;

import { z } from 'zod';

export const VnLengthSchemaDto = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export type VnLengthDto = z.infer<typeof VnLengthSchemaDto>;

import * as z from 'zod';
import type { TypeOf } from 'zod';

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  token: z.string().min(1),
  permissions: z.array(z.enum(['read', 'write'])),
});

export type User = TypeOf<typeof userSchema>;

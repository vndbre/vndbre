import { z } from 'zod';
import type { TypeOf } from 'zod';

export const authInfoSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  token: z.string().min(1),
  permissions: z.enum(['read', 'write']).array(),
});

export type AuthInfo = TypeOf<typeof authInfoSchema>;

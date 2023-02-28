import * as z from 'zod';
import type { TypeOf } from 'zod';

export const authInfoDtoSchema = z.object({
  id: z.string(),
  username: z.string(),
  permissions: z.enum(['listread', 'listwrite']).array(),
});

export type AuthInfoDto = TypeOf<typeof authInfoDtoSchema>;

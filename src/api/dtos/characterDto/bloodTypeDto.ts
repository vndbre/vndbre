import { z } from 'zod';

export const BloodTypeDtoSchema = z.enum(['a', 'b', 'ab', 'o']);

export type BloodTypeDto = z.infer<typeof BloodTypeDtoSchema>;

import { z } from 'zod';

export const BloodTypeDtoSchema = z.enum(['a', 'b', 'c', 'ab', 'o']);

export type BloodTypeDto = z.infer<typeof BloodTypeDtoSchema>;

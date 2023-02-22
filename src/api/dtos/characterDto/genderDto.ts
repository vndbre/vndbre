import { z } from 'zod';

export const GenderDtoSchema = z.enum(['m', 'f', 'b']);

export type GenderDto = z.infer<typeof GenderDtoSchema>;

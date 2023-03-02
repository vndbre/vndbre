import { z } from 'zod';
import { BloodTypeDtoSchema } from './bloodTypeDto';
import { GenderDtoSchema } from './genderDto';
import { CharacterTraitDtoSchema } from './characterTraitDto';
import { CharacterVnInfoDtoSchema } from './characterVnInfoDto';
import { ImageSchemaDto } from '../imageDto';

export const CharacterDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: ImageSchemaDto.nullable(),
  original: z.string().nullable(),
  aliases: z.string().array(),
  description: z.string().nullable(),
  blood_type: BloodTypeDtoSchema.nullable(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  bust: z.number().nullable(),
  hips: z.number().nullable(),
  cup: z.string().nullable(),
  age: z.number().nullable(),
  birthday: z.tuple([z.number(), z.number()]).nullable(),
  sex: z.tuple([GenderDtoSchema, GenderDtoSchema]).nullable(),
  vns: CharacterVnInfoDtoSchema.array(),
  traits: CharacterTraitDtoSchema.array(),
});

export type CharacterDto = z.infer<typeof CharacterDtoSchema>;

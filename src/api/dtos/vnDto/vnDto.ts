import { z } from 'zod';
import { ImageSchemaDto } from '../imageDto';
import { VnDevStatusSchemaDto } from './developmentStatusDto';
import { VnLengthSchemaDto } from './lengthDto';
import { VnScreenshotSchemaDto } from './screenshotDto';
import { VnTitleSchemaDto } from './titleDto';
import { VnTagDtoSchema } from './vnTagDto';

export const VnDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: ImageSchemaDto.nullable(),
  alttitle: z.string().nullable(),
  titles: VnTitleSchemaDto.array(),
  aliases: z.string().array(),
  olang: z.string(),
  devstatus: VnDevStatusSchemaDto,
  released: z.string().nullable(),
  languages: z.string().array(),
  platforms: z.string().array(),
  length: VnLengthSchemaDto.nullable(),
  length_minutes: z.number().nullable(),
  length_votes: z.number(),
  description: z.string().nullable(),
  rating: z.number().min(10)
    .max(100)
    .nullable(),
  popularity: z.number().min(0)
    .max(100),
  votecount: z.number(),
  screenshots: VnScreenshotSchemaDto.array(),
  tags: VnTagDtoSchema.array(),
});

export type VnDto = z.infer<typeof VnDtoSchema>;

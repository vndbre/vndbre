import { Producer } from '../../models/producer';
import { ProducerDto } from '../dtos/producerDto';

/**
 * Maps dto into model.
 * @param dto Producer dto.
 * @returns Producer object.
 */
export const producerFromDto = (dto: ProducerDto): Producer => ({
  id: dto.id,
  name: dto.name,
  original: dto.original,
  type: dto.type,
  language: dto.language,
  links: dto.links,
  aliases: dto.aliases,
  description: dto.description,
  relations: dto.relations,
});

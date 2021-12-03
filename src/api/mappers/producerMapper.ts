import { Producer, ProducerRelated } from '../../models/producer';
import { ProducerDto, ProducerRelatedDto } from '../dtos/producerDto';

/**
 * Maps dto into model.
 * @param dto Dto.
 */
const producerRelatedFromDto = (dto: ProducerRelatedDto): ProducerRelated => ({
  id: dto.id,
  name: dto.name,
  originalName: dto.original,
  relation: dto.relation,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 */
export const producerFromDto = (dto: ProducerDto): Producer => ({
  id: dto.id,
  name: dto.name,
  originalName: dto.original,
  type: dto.type,
  links: dto.links,
  aliases: dto.aliases,
  description: dto.description,
  relations: dto.relations.map(relatedDto => producerRelatedFromDto(relatedDto)),
});

import { Producer, ProducerRelated } from '../../models/producer';
import { ProducerDto, ProducerRelatedDto } from '../dtos/producerDto';

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const producerRelatedFromDto = (dto: ProducerRelatedDto): ProducerRelated => ({
  id: dto.id,
  name: dto.name,
  original: dto.original,
  relation: dto.relation,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
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
  relations: dto.relations.map(relatedDto => producerRelatedFromDto(relatedDto)),
});

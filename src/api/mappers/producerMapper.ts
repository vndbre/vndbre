import { Producer, ProducerRelated } from '../../models/producer';
import { ProducerDto, ProducerRelatedDto } from '../dtos/producerDto';
import { ExternalLinksMapper } from './externalLinksMapper';

/** Producer mapper. */
export namespace ProducerMapper {

  /**
   * Maps related producer from dto.
   * @param dto Dto.
   */
  export const mapRelatedProducerFromDto = (dto: ProducerRelatedDto): ProducerRelated => ({
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    relation: dto.relation,
  });

  /**
   * Maps producer from dto.
   * @param dto Dto.
   */
  export const fromDto = (dto: ProducerDto): Producer => ({
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    type: dto.type,
    links: ExternalLinksMapper.fromDto(dto.links),
    aliases: dto.aliases,
    description: dto.description,
    relations: dto.relations.map(relatedDto => mapRelatedProducerFromDto(relatedDto)),
  });
}

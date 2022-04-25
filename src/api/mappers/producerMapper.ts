import { Producer, ProducerRelated } from '../../models/producer';
import { ProducerDto, ProducerRelatedDto } from '../dtos/producerDto';
import { ExternalLinksMapper } from './externalLinksMapper';

/**
 * Maps related producer from dto.
 * @param dto Dto.
 */
function mapRelatedProducerFromDto(dto: ProducerRelatedDto): ProducerRelated {
  return {
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    relation: dto.relation,
  };
}

/** Producer mapper. */
export namespace ProducerMapper {

  /**
   * Maps producer from dto.
   * @param dto Dto.
   */
  export function fromDto(dto: ProducerDto): Producer {
    return {
      id: dto.id,
      name: dto.name,
      originalName: dto.original,
      type: dto.type,
      links: ExternalLinksMapper.fromDto(dto.links),
      aliases: dto.aliases,
      description: dto.description,
      relations: dto.relations.map(relatedDto => mapRelatedProducerFromDto(relatedDto)),
    };
  }
}

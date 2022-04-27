import { Language } from '../../models/language';
import { Producer, ProducerRelated } from '../../models/producer';
import { ProducerRelationType } from '../../models/producerRelationType';
import { ProducerType } from '../../models/producerType';
import { ProducerDto, ProducerRelatedDto } from '../dtos/producerDto';
import { ExternalLinksMapper } from './externalLinksMapper';

/**
 * Maps related producer from dto.
 * @param dto Dto.
 */
function producerRelatedFromDto(dto: ProducerRelatedDto): ProducerRelated {
  return {
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    relation: ProducerRelationType.toProducerRelationType(dto.relation),
  };
}

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
      type: ProducerType.toProducerType(dto.type),
      links: ExternalLinksMapper.fromDto(dto.links),
      aliases: dto.aliases,
      description: dto.description,
      relations: dto.relations.map(relatedDto => producerRelatedFromDto(relatedDto)),
      language: Language.toLanguage(dto.language),
    };
  }

}

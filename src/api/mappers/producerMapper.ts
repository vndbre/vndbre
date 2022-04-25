import { Language } from '../../models/language';
import { Producer, ProducerRelated } from '../../models/producer';
import { ProducerRelationType } from '../../models/producerRelationType';
import { ProducerType } from '../../models/producerType';
import { ProducerDto, ProducerRelatedDto } from '../dtos/producerDto';
import { ExternalLinksMapper } from './externalLinksMapper';

export namespace ProducerMapper {

  /**
   * Maps dto into model.
   * @param dto Dto.
   */
  const producerRelatedFromDto = (dto: ProducerRelatedDto): ProducerRelated => ({
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    relation: ProducerRelationType.toProducerRelationType(dto.relation),
  });

  /**
   * Maps dto into model.
   * @param dto Dto.
   */
  export const fromDto = (dto: ProducerDto): Producer => ({
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    type: ProducerType.toProducerType(dto.type),
    links: ExternalLinksMapper.fromDto(dto.links),
    aliases: dto.aliases,
    description: dto.description,
    relations: dto.relations.map(relatedDto => producerRelatedFromDto(relatedDto)),
    language: Language.toLanguage(dto.language),
  });

}

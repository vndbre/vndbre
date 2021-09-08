import { RelatedProducer } from '../api/dtos/producerDto';
import { ProducerLinks } from '../utils/types/producerLinks';

/**
 * Represents producer.
 */
export interface Producer {

  /**
   * Producer id.
   */
  id: number;

  /**
   * Producer name.
   */
  name: string;

  /**
   * Name in original.
   */
  original: string | null;

  /**
   * Primary language.
   */
  language: string;

  /**
   * Type.
   */
  type: string;

  /**
   * Links to external resources.
   */
  links: ProducerLinks;

  /**
   * Alternative names, separated by a newline.
   */
  aliases: string | null;

  /**
   * Description/notes of the producer.
   */
  description: string | null;

  /**
   * Related producers to the current producer.
   */
  relations: RelatedProducer[];
}

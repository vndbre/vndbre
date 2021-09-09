import { ProducerLinks } from '../utils/types/producerLinks';

/**
 * Represents related producer to the producer.
 */
export interface ProducerRelated {

  /**
   * Producer id.
   */
  id: number;

  /**
   * Relation to current producer.
   */
  relation: string;

  /**
   * Producer name.
   */
  name: string;

  /**
   * Name in original.
   */
  original: string | null;
}

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
  relations: ProducerRelated[];
}

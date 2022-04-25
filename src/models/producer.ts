import { ExternalLink } from './externalLink';

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
  originalName: string | null;
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
  originalName: string | null;

  /**
   * Type.
   */
  type: string;

  /**
   * Links to external resources.
   */
  links: readonly ExternalLink[];

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

import { Language } from './language';
import { ProducerLinks } from './producerLinks';
import { ProducerRelationType } from './producerRelationType';
import { ProducerType } from './producerType';

/**
 * Represents related producer to the producer.
 */
export interface ProducerRelated {

  /**
   * Producer id.
   */
  readonly id: number;

  /**
   * Relation to current producer.
   */
  readonly relation: ProducerRelationType;

  /**
   * Producer name.
   */
  readonly name: string;

  /**
   * Name in original.
   */
  readonly originalName: string | null;
}

/**
 * Represents producer.
 */
export interface Producer {

  /**
   * Producer id.
   */
  readonly id: number;

  /**
   * Producer name.
   */
  readonly name: string;

  /**
   * Name in original.
   */
  readonly originalName: string | null;

  /**
   * Type.
   */
  readonly type: ProducerType;

  /**
   * Links to external resources.
   */
  readonly links: ProducerLinks;

  /**
   * Alternative names, separated by a newline.
   */
  readonly aliases: string | null;

  /**
   * Description/notes of the producer.
   */
  readonly description: string | null;

  /** Producer primary language. */
  readonly language: Language;

  /**
   * Related producers to the current producer.
   */
  readonly relations: ProducerRelated[];
}

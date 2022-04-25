import { ExternalLinksDto } from './externalLinksDto';

/**
 * Represents related producer to the producer.
 */
export interface ProducerRelatedDto {

  /**
   * Producer id.
   */
  readonly id: number;

  /**
   * Relation to current producer.
   */
  readonly relation: string;

  /**
   * Producer name.
   */
  readonly name: string;

  /**
   * Name in original.
   */
  readonly original: string | null;
}

/**
 * Represents producer dto.
 */
export interface ProducerDto {

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
  readonly original: string | null;

  /**
   * Type.
   */
  readonly type: string;

  /**
   * Primary language.
   */
  readonly language: string;

  /**
   * Links to external resources.
   */
  readonly links: ExternalLinksDto;

  /**
   * Alternative names, separated by a newline.
   */
  readonly aliases: string | null;

  /**
   * Description/notes of the producer.
   */
  readonly description: string | null;

  /**
   * Related producers to the current producer.
   */
  readonly relations: readonly ProducerRelatedDto[];
}

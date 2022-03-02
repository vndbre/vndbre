/**
 * Represents producer involved into release.
 */
export interface ReleaseProducer {

  /**
   * Producer id.
   */
  readonly id: number;

  /**
   * Is developer.
   */
  readonly isDeveloper: boolean;

  /**
   * Is publisher.
   */
  readonly isPublisher: boolean;

  /**
   * Producer name (romaji).
   */
  readonly name: string;

  /**
   * Name in original.
   */
  readonly originalName: string | null;

  /**
   * Producer type.
   */
  readonly type: string;
}

/**
 * Represents producer involved into release.
 */
export interface ReleaseProducer {

  /**
   * Producer id.
   */
  id: number;

  /**
   * Is developer.
   */
  isDeveloper: boolean;

  /**
   * Is publisher.
   */
  isPublisher: boolean;

  /**
   * Producer name (romaji).
   */
  name: string;

  /**
   * Name in original.
   */
  originalName: string | null;

  /**
   * Producer type.
   */
  type: string;
}

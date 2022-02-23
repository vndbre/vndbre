/**
 * Represents voiced character.
 */
export interface CharacterVoiced {

  /**
   * Character id.
   */
  readonly id: number;

  /**
   * The staff alias id.
   */
  readonly aliasId: number;

  /**
   * VN id.
   */
  readonly visualNovelId: number;

  /**
   * Notes.
   */
  readonly note: string;
}

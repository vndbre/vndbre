import { SpoilerLevel } from '../spoilerLevel';

/**
 * Represents character instance of the character.
 */
export interface CharacterInstance {

  /**
   * Character id.
   */
  readonly id: number;

  /**
   * Spoiler level.
   * 0=none,
   * 1=minor,
   * 2=major.
   */
  readonly spoiler: SpoilerLevel;

  /**
   * Character name.
   */
  readonly name: string;

  /**
   * Character name in original.
   */
  readonly originalName: string;
}

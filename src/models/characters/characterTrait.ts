import { SpoilerLevel } from '../spoilerLevel';

/**
 * Represents character trait.
 */
export interface CharacterTrait {

  /**
   * Trait id.
   */
  readonly id: number;

  /**
   * Between 0-2.
   */
  readonly spoilerLevel: SpoilerLevel;
}

import type { SpoilerLevel } from '../spoilerLevel';

/** Character trait. */
export interface CharacterTrait {

  /** Trait id. */
  readonly id: string;

  /** Spoiler level. */
  readonly spoilerLevel: SpoilerLevel;
}

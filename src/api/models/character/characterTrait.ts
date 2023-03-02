import type { SpoilerLevel } from '../spoilerLevel';
import type { Trait } from '../trait';

/** Character trait. */
export interface CharacterTrait extends Trait {

  /** Spoiler level. */
  readonly spoilerLevel: SpoilerLevel;
}

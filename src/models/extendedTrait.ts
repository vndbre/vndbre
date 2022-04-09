import { SpoilerLevel } from './spoilerLevel';
import { Trait } from './trait';

/**
 * Represents vn tag with all possible properties.
 */
export interface ExtendedTrait extends Trait {

  /** Trait spoiler level. */
  readonly spoilerLevel: SpoilerLevel;
}

import { ExtendedTrait } from './extendedTrait';
import { Trait } from './trait';

/**
 * Describes shape of object that contains traits and its root traits.
 */
export interface ExtendedTraitsWithRoots {

  /** List of extended traits. */
  readonly traits: readonly ExtendedTrait[];

  /** List of root traits. */
  readonly rootTraits: readonly Trait[];
}

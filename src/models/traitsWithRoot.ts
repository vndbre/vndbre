import { Trait } from './trait';

/**
 * Describes shape of object that contains traits and its root traits.
 */
export interface TraitsWithRoot {

  /** List of traits. */
  readonly traits: Trait[];

  /** List of root traits. */
  readonly rootTraits: Trait[];
}

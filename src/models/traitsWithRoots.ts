import { Trait } from './trait';

/**
 * Describes shape of object that contains traits and its root traits.
 */
export interface TraitsWithRoots {

  /** List of traits. */
  readonly traits: readonly Trait[];

  /** List of root traits. */
  readonly rootTraits: readonly Trait[];
}

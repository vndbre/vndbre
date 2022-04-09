/** Describes shape of character trait. */
export interface Trait {

  /** Trait id. */
  readonly id: number;

  /** Trait name. */
  readonly name: string;

  /** Trait description. */
  readonly description: string;

  /**
   * Whether this is a meta trait or not.
   * This field only exists for backwards compatibility and is currently the inverse of "searchable".
   */
  readonly isMeta: boolean;

  /** Whether it's possible to filter characters by this trait. */
  readonly isSearchable: boolean;

  /** Whether this trait can be applied to character entries. */
  readonly isApplicable: boolean;

  /** Number of characters on which this trait and any child traits is used.  */
  readonly charactersUsed: number;

  /** List of alternative names. */
  readonly aliases: readonly string[];

  /**
   * List of parent traits (empty for root traits).
   * The first element in this array points to the primary parent trait.
   */
  readonly parentIds: readonly number[];

  /** Id of root trait for this trait. */
  readonly rootId: number;
}

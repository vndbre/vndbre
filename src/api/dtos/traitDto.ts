export interface TraitDto {

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
  readonly meta: boolean;

  /** Whether it's possible to filter characters by this trait. */
  readonly searchable: boolean;

  /** Whether this trait can be applied to character entries. */
  readonly applicable: boolean;

  /** Number of characters on which this trait and any child traits is used.  */
  readonly chars: number;

  /** (Possibly empty) list of alternative names. */
  readonly aliases: readonly string[];

  /**
   * List of parent traits (empty for root traits).
   * The first element in this array points to the primary parent trait.
   */
  readonly parents: readonly number[];

  /** Id of root trait. */
  readonly root_id: number;
}

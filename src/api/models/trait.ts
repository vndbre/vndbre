interface TraitParent {

  /**
   * Top-level parent trait id.
   */
  readonly id: string;

  /**
   * Top-level parent trait name.
   */
  readonly name: string;
}

/** Trait(eye-color, hair, etc...). */
export interface Trait {

  /** Id. */
  readonly id: string;

  /** Name. Not necessarily self-describing. */
  readonly name: string;

  /** Description. */
  readonly description: string | null;

  /** Alias names. */
  readonly aliases: readonly string[];

  /**
   * Parent info.
   * If null, then trait is a parent trait(root trait.).
   */
  readonly parent: TraitParent | null;

  /** Whether trait is searchable. */
  readonly isSearchable: boolean;

  /** Whether trait is applicable. */
  readonly isApplicable: boolean;
}

/** Trait(eye-color, hair, etc...). */
export interface Trait {

  /** Id. */
  readonly id: string;

  /** Name. Not necessarily self-describing. */
  readonly name: string;

  /** Description. */
  readonly description: string | null;

  /** Alias names. */
  readonly aliases: string[];

  /**
   * Top-level parent trait id.
   * If null - trait is a root trait.
   */
  readonly groupId: string | null;

  /**
   * Top-level parent trait name.
   * If null - trait is a root trait.
   */
  readonly groupName: string | null;

  /** Whether trait is searchable. */
  readonly isSearchable: boolean;

  /** Whether trait is applicable. */
  readonly isApplicable: boolean;
}

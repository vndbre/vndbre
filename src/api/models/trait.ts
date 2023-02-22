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

  /** Top-level parent trait id. */
  readonly groupId: string;

  /** Top-level parent trait name. */
  readonly groupName: string;
}

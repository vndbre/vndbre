export type TagCategory = 'ero' | 'cont' | 'tech';

/** Tag. */
export interface Tag {

  /** Tag id. */
  readonly id: string;

  /** Tag aliases. */
  readonly aliases: readonly string[];

  /** Tag name. */
  readonly name: string;

  /** Tag category. */
  readonly category: TagCategory;
}

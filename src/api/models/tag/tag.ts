import type { TagCategory } from './tagCategory';

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

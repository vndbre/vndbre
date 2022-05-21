import { SelectOption } from '../utils/selectOption';
import { TagClassification } from './tagClassification';

/** Represents vn tag. */
export interface Tag {

  /** Tag id. */
  readonly id: number;

  /** Tag name. */
  readonly name: string;

  /** List of alternative names. */
  readonly aliases: readonly string[];

  /** Tag classification. */
  readonly cat: TagClassification;

  /** Whether this is a meta tag or not. This field only exists for backwards compatibility and is currently the inverse of "searchable". */
  readonly isMeta: boolean;

  /** List of parent tags (empty for root tags). The first element in this array points to the primary parent tag. */
  readonly parents: readonly number[];

  /** Whether it's possible to filter VNs by this tag. */
  readonly isSearchable: boolean;

  /** Number of tagged VNs (including child tags). */
  readonly visualNovelsCount: number;

  /** Whether this tag can be applied to VN entries. */
  readonly isApplicable: boolean;
}

export namespace Tag {

  /**
   * Converts the specified tag to a select option.
   * @param value Tag.
   */
  export function toSelectOption(value: Tag): SelectOption<Tag['id']> {
    return SelectOption.create(value.id, value.name);
  }
}

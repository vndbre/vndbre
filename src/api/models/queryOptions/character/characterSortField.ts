export const CHARACTER_SORT_FIELDS = ['name', 'id'] as const;

export type CharacterSortField = typeof CHARACTER_SORT_FIELDS[number];

const CHARACTER_SORT_FIELD_READABLE_MAP: Readonly<Record<CharacterSortField, string>> = {
  id: 'None',
  name: 'Name',
};

export namespace CharacterSortField {

  /**
   * Converts sort field to readable equivalent.
   * @param field Sort field.
   */
  export function toReadable(field: CharacterSortField): string {
    return CHARACTER_SORT_FIELD_READABLE_MAP[field];
  }
}

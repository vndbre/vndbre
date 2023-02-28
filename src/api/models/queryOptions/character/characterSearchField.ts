export const CHARACTER_SEARCH_FIELDS = [
  'search',
  'role',
  'blood_type',
  'sex',
  'trait',
  'vn',
  'seiyuu',
  'height',
  'weight',
  'hips',
  'bust',
  'waist',
  'cup',
  'age',
] as const;

export type CharacterSearchField = typeof CHARACTER_SEARCH_FIELDS[number];

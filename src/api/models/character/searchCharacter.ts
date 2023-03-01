import type { Character } from './character';

/** Model for search. */
export type SearchCharacter = Pick<Character, 'id' | 'image' | 'name'>;

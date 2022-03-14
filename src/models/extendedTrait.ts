import { CharacterTrait } from './characters/characterTrait';
import { Trait } from './trait';

/**
 * Represents vn tag with all possible properties.
 */
export interface ExtendedTrait extends Trait, Readonly<Omit<CharacterTrait, 'id'>> {}

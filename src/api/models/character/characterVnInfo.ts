import type { CharacterRole } from './characterRole';

/** Info about vn where character appeared. */
export interface CharacterVnInfo {

  /** Vn id. */
  readonly id: string;

  /** Character's role in vn. */
  readonly role: CharacterRole;

  // TODO: Add `release` field.
}

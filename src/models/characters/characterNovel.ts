import { CharacterRole } from './characterRole';
import { SpoilerLevel } from '../spoilerLevel';

/**
 * Represents Novel linked to the character.
 */
export interface CharacterNovel {

  /**
   * VN id.
   */
  readonly visualNovelId: number;

  /**
   * Release id.
   */
  readonly releaseId: number;

  /**
   * Spoiler level (0-2).
   */
  readonly spoilerLevel: SpoilerLevel;

  /**
   * Character role.
   */
  readonly role: CharacterRole;
}

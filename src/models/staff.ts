import { Gender } from './gender';
import { Language } from './language';
import { StaffLinks } from './staffLinks';
import { StaffRole } from './staffRole';

/**
 * Represents character entry that this staff has voiced.
 */
export interface StaffCharacterVoiced {

  /**
   * VN id.
   */
  readonly id: number;

  /**
   * Alias id of this staff entry.
   */
  readonly aliasId: number;

  /**
   * Character id.
   */
  readonly characterId: number;

  /**
   * Note.
   */
  readonly note: string | null;
}

/**
 * Represents visual novel that this staff entry has been credited in (excluding character voicing).
 */
export interface StaffVisualNovel {

  /**
   * VN id.
   */
  readonly id: number;

  /**
   * Alias id of this staff entry.
   */
  readonly aliasId: number;

  /**
   * Role.
   */
  readonly role: StaffRole;

  /**
   * Note.
   */
  readonly note: string | null;
}

/**
 * Represents staff alias.
 */
export interface StaffAlias {

  /**
   * Alias id.
   */
  readonly aliasId: number;

  /**
   * Alias name (romaji).
   */
  readonly name: string;

  /**
   * Primary original name.
   */
  readonly originalName: string;
}

/**
 * Represents staff.
 */
export interface Staff {

  /**
   * Staff id.
   */
  readonly id: number;

  /**
   * Staff name (romaji).
   */
  readonly name: string;

  /**
   * Primary original name.
   */
  readonly originalName: string | null;

  /**
   * Gender.
   */
  readonly gender: Gender | null;

  /**
   * Primary language.
   */
  readonly language: Language;

  /**
   * Links to staff's external resources.
   */
  readonly links: StaffLinks | null;

  /**
   * Description or notes.
   */
  readonly description: string | null;

  /**
   * Names and aliases.
   */
  readonly aliases: readonly StaffAlias[];

  /**
   * ID of the alias that is the "primary" name of the entry.
   */
  readonly mainAlias: number | null;

  /**
   * Visual novels that this staff entry has been credited in (excluding character voicing).
   */
  readonly visualNovels: readonly StaffVisualNovel[];

  /**
   * Characters that this staff entry has voiced.
   */
  readonly voiced: readonly StaffCharacterVoiced[];
}

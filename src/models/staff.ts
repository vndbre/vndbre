import { StaffLinks } from '../utils/types/staffLinks';

/**
 * Represents character entry that this staff has voiced.
 */
export interface StaffCharacterVoiced {

  /**
   * VN id.
   */
  id: number;

  /**
   * Alias id of this staff entry.
   */
  aid: number;

  /**
   * Character id.
   */
  cid: number;

  /**
   * Note.
   */
  note: string | null;
}

/**
 * Represents visual novel that this staff entry has been credited in (excluding character voicing).
 */
export interface StaffVisualNovel {

  /**
   * VN id.
   */
  id: number;

  /**
   * Alias id of this staff entry.
   */
  aid: number;

  /**
   * Role.
   */
  role: string;

  /**
   * Note.
   */
  note: string | null;
}

/**
 * Represents staff alias.
 */
export interface StaffAlias {

  /**
   * Alias id.
   */
  aid: number;

  /**
   * Alias name (romaji).
   */
  name: string;

  /**
   * Primary original name.
   */
  original: string;
}

/**
 * Represents staff.
 */
export interface Staff {

  /**
   * Staff id.
   */
  id: number;

  /**
   * Staff name (romaji).
   */
  name: string;

  /**
   * Primary original name.
   */
  original: string | null;

  /**
   * Gender.
   */
  gender: string | null;

  /**
   * Primary language.
   */
  language: string;

  /**
   * Links to staff's external resources.
   */
  links: StaffLinks;

  /**
   * Description or notes.
   */
  description: string | null;

  /**
   * Names and aliases.
   */
  aliases: StaffAlias[];

  /**
   * ID of the alias that is the "primary" name of the entry.
   */
  mainAlias: number;

  /**
   * Visual novels that this staff entry has been credited in (excluding character voicing).
   */
  visualNovels: StaffVisualNovel[];

  /**
   * Characters that this staff entry has voiced.
   */
  voiced: StaffCharacterVoiced[];
}

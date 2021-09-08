import { StaffLinks } from '../../utils/types/staffLinks';

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
 * Represents staff dto.
 */
export interface StaffDto {

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
   * List of names and aliases.
   * Each name is represented as an array with the following elements:
   * Alias ID,
   * name (romaji),
   * the original name.
   * This list also includes the "primary" name.
   */
  aliases: [number, string, string][];

  /**
   * ID of the alias that is the "primary" name of the entry.
   */
  main_alias: number;

  /**
   * Visual novels that this staff entry has been credited in (excluding character voicing).
   */
  vns: StaffVisualNovel[];

  /**
   * Characters that this staff entry has voiced.
   */
  voiced: StaffCharacterVoiced[];
}

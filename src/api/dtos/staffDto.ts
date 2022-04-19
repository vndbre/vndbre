import { GenderDto } from './genderDto';

/**
 * Staff links dto.
 */
export interface StaffLinksDto {

  /**
   * Name of the related article on the English Wikipedia.
   */
  readonly wikipedia: string | null;

  /**
   * Wikidata identifier.
   */
  readonly wikidata: string | null;

  /**
   * Twitter account name.
   */
  readonly twitter: string | null;

  /**
   * AniDB creator id.
   */
  readonly anidb: string | null;

  /**
   * Id of pixiv account.
   */
  readonly pixiv: string | null;
}

/**
 * Represents character entry that this staff has voiced.
 */
export interface StaffCharacterVoicedDto {

  /**
   * VN id.
   */
  readonly id: number;

  /**
   * Alias id of this staff entry.
   */
  readonly aid: number;

  /**
   * Character id.
   */
  readonly cid: number;

  /**
   * Note.
   */
  readonly note: string | null;
}

/**
 * Represents visual novel that this staff entry has been credited in (excluding character voicing).
 */
export interface StaffVisualNovelDto {

  /**
   * VN id.
   */
  readonly id: number;

  /**
   * Alias id of this staff entry.
   */
  readonly aid: number;

  /**
   * Role.
   */
  readonly role: string;

  /**
   * Note.
   */
  readonly note: string | null;
}

/**
 * Represents staff dto.
 */
export interface StaffDto {

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
  readonly original: string | null;

  /**
   * Gender.
   */
  readonly gender: GenderDto | null;

  /**
   * Primary language.
   */
  readonly language: string;

  /**
   * Links to staff's external resources.
   */
  readonly links?: StaffLinksDto;

  /**
   * Description or notes.
   */
  readonly description: string | null;

  /**
   * List of names and aliases.
   * Each name is represented as an array with the following elements:
   * Alias ID,
   * name (romaji),
   * the original name.
   * This list also includes the "primary" name.
   */
  readonly aliases?: readonly [number, string, string][];

  /**
   * ID of the alias that is the "primary" name of the entry.
   */
  readonly main_alias?: number;

  /**
   * Visual novels that this staff entry has been credited in (excluding character voicing).
   */
  readonly vns?: readonly StaffVisualNovelDto[];

  /**
   * Characters that this staff entry has voiced.
   */
  readonly voiced?: readonly StaffCharacterVoicedDto[];
}

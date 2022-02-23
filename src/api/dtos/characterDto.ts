import { CharacterGender } from '../../utils/types/characterHelperTypes';
import { SpoilerLevel } from '../../utils/types/spoilerLevel';
import { ImageFlaggingDto } from './imageFlaggingDto';

/**
 * Represents character instance of the character.
 */
export interface CharacterInstanceDto {

  /**
   * Character id.
   */
  readonly id: number;

  /**
   * Spoiler level.
   * 0=none,
   * 1=minor,
   * 2=major.
   */
  readonly spoiler: SpoilerLevel;

  /**
   * Character name.
   */
  readonly name: string;

  /**
   * Character name in original.
   */
  readonly original: string;
}

/**
 * Represents voiced character.
 */
export interface CharacterVoicedDto {

  /**
   * Character id.
   */
  readonly id: number;

  /**
   * The staff alias id.
   */
  readonly aid: number;

  /**
   * VN id.
   */
  readonly vid: number;

  /**
   * Notes.
   */
  readonly note: string;
}

/**
 * Represents character dto.
 */
export interface CharacterDto {

  /**
   * Character id.
   */
  readonly id: number;

  /**
   * Character name (romaji).
   */
  readonly name: string;

  /**
   * Original (kana/kanji) name.
   */
  readonly original: string | null;

  /**
   * Character's sex (not gender); "m" (male), "f" (female) or "b" (both).
   */
  readonly gender: CharacterGender | null;

  /**
   * Actual sex, if this is a spoiler. Can also be "unknown" if their actual sex is not known but different from their apparent sex.
   */
  readonly spoil_gender: string | null;

  /**
   * Blood type, "a", "b", "ab" or "o".
   */
  readonly bloodt: 'a' | 'b' | 'ab' | 'o' | null;

  /**
   * Array of two numbers: day of the month (1-31) and the month (1-12).
   */
  readonly birthday: readonly number[];

  /**
   * Alternative names, separated with a newline.
   */
  readonly aliases: string | null;

  /**
   * Description/notes.
   */
  readonly description: string | null;

  /**
   * Age in years.
   */
  readonly age: number | null;

  /**
   * Image url.
   */
  readonly image: string;

  /**
   * Image flagging summary.
   */
  readonly image_flagging: ImageFlaggingDto | null;

  /**
   * Bust in cm.
   */
  readonly bust: number | null;

  /**
   * Waist in cm.
   */
  readonly waist: number | null;

  /**
   * Hip in cm.
   */
  readonly hip: number | null;

  /**
   * Height in cm.
   */
  readonly height: number | null;

  /**
   * Weight in kg.
   */
  readonly weight: number | null;

  /**
   * Cup size.
   */
  readonly cup_size: string | null;

  /**
   * Traits linked to this character.
   * Each trait is represented as an array of two elements:
   * the trait id (integer),
   * the spoiler level (integer, 0-2).
   */
  readonly traits?: readonly number[][];

  /**
   * VNs linked to this character.
   * Each VN is an array of 4 elements:
   * VN id,
   * release ID (0 = "all releases"),
   * spoiler level (0-2),
   * the role (string).
   * Available roles:
   * "main",
   * "primary",
   * "side",
   * "appears".
   */
  readonly vns?: readonly [number, number, number, string][];

  /**
   * Voice actresses that voiced this character, per VN.
   */
  readonly voiced: readonly CharacterVoicedDto[];

  /**
   * Instances of this character.
   */
  readonly instances?: readonly CharacterInstanceDto[];
}

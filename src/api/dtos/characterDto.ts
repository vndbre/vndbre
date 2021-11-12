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
  id: number;

  /**
   * Spoiler level.
   * 0=none,
   * 1=minor,
   * 2=major.
   */
  spoiler: SpoilerLevel;

  /**
   * Character name.
   */
  name: string;

  /**
   * Character name in original.
   */
  original: string;
}

/**
 * Represents voiced character.
 */
export interface CharacterVoicedDto {

  /**
   * Character id.
   */
  id: number;

  /**
   * The staff alias id.
   */
  aid: number;

  /**
   * VN id.
   */
  vid: number;

  /**
   * Notes.
   */
  note: string;
}

/**
 * Represents character dto.
 */
export interface CharacterDto {

  /**
   * Character id.
   */
  id: number;

  /**
   * Character name (romaji).
   */
  name: string;

  /**
   * Original (kana/kanji) name.
   */
  original: string | null;

  /**
   * Character's sex (not gender); "m" (male), "f" (female) or "b" (both).
   */
  gender: CharacterGender | null;

  /**
   * Actual sex, if this is a spoiler. Can also be "unknown" if their actual sex is not known but different from their apparent sex.
   */
  spoil_gender: string | null;

  /**
   * Blood type, "a", "b", "ab" or "o".
   */
  bloodt: 'a' | 'b' | 'ab' | 'o' | null;

  /**
   * Array of two numbers: day of the month (1-31) and the month (1-12).
   */
  birthday: number[];

  /**
   * Alternative names, separated with a newline.
   */
  aliases: string | null;

  /**
   * Description/notes.
   */
  description: string | null;

  /**
   * Age in years.
   */
  age: number | null;

  /**
   * Image url.
   */
  image: string;

  /**
   * Image flagging summary.
   */
  image_flagging: ImageFlaggingDto | null;

  /**
   * Bust in cm.
   */
  bust: number | null;

  /**
   * Waist in cm.
   */
  waist: number | null;

  /**
   * Hip in cm.
   */
  hip: number | null;

  /**
   * Height in cm.
   */
  height: number | null;

  /**
   * Weight in kg.
   */
  weight: number | null;

  /**
   * Cup size.
   */
  cup_size: string | null;

  /**
   * Traits linked to this character.
   * Each trait is represented as an array of two elements:
   * the trait id (integer),
   * the spoiler level (integer, 0-2).
   */
  traits?: number[][];

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
  vns?: [number, number, number, string][];

  /**
   * Voice actresses that voiced this character, per VN.
   */
  voiced: CharacterVoicedDto[];

  /**
   * Instances of this character.
   */
  instances?: CharacterInstanceDto[];
}

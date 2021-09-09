import { CharacterGender } from '../utils/types/characterHelperTypes';
import { SpoilerLevel } from '../utils/types/spoilerLevel';
import { ImageFlagging } from './imageFlagging';

/**
 * Represents character instance of the character.
 */
export interface CharacterInstance {

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
  originalName: string;
}

/**
 * Represents voiced character.
 */
export interface CharacterVoiced {

  /**
   * Character id.
   */
  id: number;

  /**
   * The staff alias id.
   */
  aliasId: number;

  /**
   * VN id.
   */
  visualNovelId: number;

  /**
   * Notes.
   */
  note: string;
}

/**
 * Represents character trait.
 */
export interface CharacterTrait {

  /**
   * Trait id.
   */
  id: number;

  /**
   * Between 0-2.
   */
  spoilerLevel: SpoilerLevel;
}

/**
 * Represents Novel linked to the character.
 */
export interface CharacterNovel {

  /**
   * VN id.
   */
  visualNovelId: number;

  /**
   * Release id.
   */
  releaseId: number;

  /**
   * Spoiler level (0-2).
   */
  spoilerLevel: SpoilerLevel;

  /**
   * Role.
   */
  role: string;
}

/**
 * Represents character dto.
 */
export interface Character {

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
  originalName: string | null;

  /**
   * Character's sex (not gender); "m" (male), "f" (female) or "b" (both).
   */
  gender: CharacterGender | null;

  /**
   * Actual sex, if this is a spoiler. Can also be "unknown" if their actual sex is not known but different from their apparent sex.
   */
  spoilGender: string | null;

  /**
   * Blood type, "a", "b", "ab" or "o".
   */
  bloodType: 'a' | 'b' | 'ab' | 'o' | null;

  /**
   * Birthday in format dd-mm.
   */
  birthday: string;

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
  imageFlagging: ImageFlagging | null;

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
  cupSize: string | null;

  /**
   * Traits linked to this character.
   */
  traits: CharacterTrait[];

  /**
   * VNs linked to this character.
   */
  visualNovels: CharacterNovel[];

  /**
   * Voice actresses that voiced this character, per VN.
   */
  voiced: CharacterVoiced[];

  /**
   * Instances of this character.
   */
  instances: CharacterInstance[];
}

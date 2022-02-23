import { Roles } from '../utils/types/roles';
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
  readonly originalName: string;
}

/**
 * Represents voiced character.
 */
export interface CharacterVoiced {

  /**
   * Character id.
   */
  readonly id: number;

  /**
   * The staff alias id.
   */
  readonly aliasId: number;

  /**
   * VN id.
   */
  readonly visualNovelId: number;

  /**
   * Notes.
   */
  readonly note: string;
}

/**
 * Represents character trait.
 */
export interface CharacterTrait {

  /**
   * Trait id.
   */
  readonly id: number;

  /**
   * Between 0-2.
   */
  readonly spoilerLevel: SpoilerLevel;
}

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
   * Role.
   */
  readonly role: Roles;
}

/**
 * Represents character dto.
 */
export interface Character {

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
  readonly originalName: string | null;

  /**
   * Character's sex (not gender); "m" (male), "f" (female) or "b" (both).
   */
  readonly gender: CharacterGender | null;

  /**
   * Actual sex, if this is a spoiler. Can also be "unknown" if their actual sex is not known but different from their apparent sex.
   */
  readonly spoilerGender: string | null;

  /**
   * Blood type, "a", "b", "ab" or "o".
   */
  readonly bloodType: 'a' | 'b' | 'ab' | 'o' | null;

  /**
   * Birthday in format dd-mm.
   */
  readonly birthday: string;

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
  readonly imageFlagging: ImageFlagging | null;

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
  readonly cupSize: string | null;

  /**
   * Traits linked to this character.
   */
  readonly traits?: readonly CharacterTrait[];

  /**
   * VNs linked to this character.
   */
  readonly visualNovels?: readonly CharacterNovel[];

  /**
   * Voice actresses that voiced this character, per VN.
   */
  readonly voicedActors: readonly CharacterVoiced[];

  /**
   * Instances of this character.
   */
  readonly instances?: readonly CharacterInstance[];
}

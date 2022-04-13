import { ImageFlagging } from '../imageFlagging';
import { CharacterInstance } from './characterInstance';
import { CharacterNovel } from './characterNovel';
import { CharacterTrait } from './characterTrait';
import { CharacterVoiced } from './characterVoiced';
import { Gender } from '../gender';

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
  readonly gender: Gender | null;

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
  readonly traits: readonly CharacterTrait[];

  /**
   * VNs linked to this character.
   */
  readonly visualNovels: readonly CharacterNovel[];

  /**
   * Voice actresses that voiced this character, per VN.
   */
  readonly voicedActors: readonly CharacterVoiced[];

  /**
   * Instances of this character.
   */
  readonly instances: readonly CharacterInstance[];
}

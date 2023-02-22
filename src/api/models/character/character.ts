import type { Image } from '../image';
import type { SpoilerLevel } from '../spoilerLevel';
import type { BloodType } from './bloodType';
import type { CharacterTrait } from './characterTrait';
import type { CharacterVnInfo } from './characterVnInfo';
import type { Gender } from './gender';

/** Character. */
export interface Character {

  /** Id. */
  readonly id: string;

  /** Name. */
  readonly name: string;

  /** Aliases. */
  readonly aliases: readonly string[];

  /** Description. */
  readonly description: string | null;

  /** Image. */
  readonly image: Image | null;

  /** Blood type. */
  readonly bloodType: BloodType | null;

  /** Height in cm. */
  readonly height: number | null;

  /** Height in kg. */
  readonly weight: number | null;

  /** Bust size in cm. */
  readonly bust: number | null;

  /** Hips in cm. */
  readonly hips: number | null;

  /** Cup size can be any letter of alphabet or "AAA" | "AA". */
  readonly cup: string | null;

  /** Age in years. */
  readonly age: number | null;

  /** Birthday. */
  readonly birthday: {

    /** Birth month. */
    readonly month: number;

    /** Birth day. */
    readonly day: number;
  } | null;

  /** Character gender separated by spoiler level. */
  readonly gender: Readonly<Record<SpoilerLevel, Gender>> | null;

  /** Info about vns where character participated. */
  readonly vnsInfo: readonly CharacterVnInfo[];

  /** List of character traits. */
  readonly traits: readonly CharacterTrait[];
}

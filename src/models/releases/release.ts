import { Language } from '../language';
import { Platform } from '../platform';
import { ReleaseType } from './releaseType';
import { ReleaseVoiceStatus } from './releaseVoiceStatus';
import { ReleaseAnimation } from './releaseAnimation';
import { ReleaseMedia } from './releaseMedia';
import { ReleaseProducer } from './releaseProducer';

export interface ReleaseId {

  /**
   * Visual novel ID.
   */
  readonly id: number;
}

export interface ReleaseBasic {

  /**
   * Main title.
   */
  readonly title: string;

  /**
   * Original/official title.
   */
  readonly originalName: string | null;

  /**
   * Date of the first release. Can be in 'yyyy', 'TBA', 'yyyy-mm', 'yyyy-mm-dd' formats.
   */
  readonly releasedDate: string;

  /**
   * Visual novel languages.
   */
  readonly languages: Language[];

  /**
   * Release type.
   */
  readonly type: ReleaseType;

  /**
   * Patch flag.
   */
  readonly isPatch: boolean;

  /**
   * Freeware flag.
   */
  readonly isFreeware: boolean;

  /**
   * Doujin flag.
   */
  readonly isDoujin: boolean;
}

export interface ReleaseDetails {

  /**
   * Platform where visual novel was released.
   */
  readonly platforms: readonly Platform[];

  /**
   * Official website url.
   */
  readonly website: string | null;

  /**
   * Random notes.
   */
  readonly notes: string | null;

  /**
   * Age rating.
   */
  readonly ageRating: string;

  /**
   * AN/UPC/EAN code. This is actually an integer, but formatted as a string to avoid an overflow on 32bit platforms.
   */
  readonly gtin: string | null;

  /**
   * Catalog number.
   */
  readonly catalog: string | null;

  /**
   * Media.
   */
  readonly media: readonly ReleaseMedia[];

  /**
   * Resolution.
   */
  readonly resolution: string | null;

  /**
   * Voiced release.
   * 1 = Not voiced,
   * 2 = Only ero scenes voiced,
   * 3 = Partially voiced,
   * 4 = Fully voiced.
   */
  readonly voiced: ReleaseVoiceStatus | null;

  /**
   * Animation status.
   */
  readonly animation: ReleaseAnimation;
}

export interface ReleaseProducers {

  /**
   * Producers involved into release.
   */
  readonly producers: readonly ReleaseProducer[];
}

/**
 * Represents release.
 */
export type Release = ReleaseId & ReleaseBasic & ReleaseDetails & ReleaseProducers;

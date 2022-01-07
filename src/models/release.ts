import { Language } from '../api/services/languageService';
import { Platform } from '../api/services/platformService';
import { ReleaseAnimationType } from '../enums/releaseAnimationType';
import { ReleaseType } from '../enums/releaseType';
import { ReleaseVoiceStatus } from '../enums/releaseVoiceStatus';
import { VisualNovel } from './visualNovel';

/**
 * Represents producer involved into release.
 */
export interface ReleaseProducer {

  /**
   * Producer id.
   */
  id: number;

  /**
   * Is developer.
   */
  isDeveloper: boolean;

  /**
   * Is publisher.
   */
  isPublisher: boolean;

  /**
   * Producer name(romaji).
   */
  name: string;

  /**
   * Name in original.
   */
  originalName: string | null;

  /**
   * Producer type.
   */
  type: string;
}

/**
 * Represents release media.
 */
export interface ReleaseMedia {

  /**
   * Medium.
   */
  medium: string;

  /**
   * Quantity.
   */
  quantity: number;
}

/**
 * Represents animation quality.
 */
export interface ReleaseAnimation {

  /**
   * Story scenes animation.
   */
  storyAnimation: ReleaseAnimationType | null;

  /**
   * Ero scenes animation.
   */
  eroAnimation: ReleaseAnimationType | null;
}

/**
 * Represents release.
 */
export interface Release {

  /**
   * Visual novel ID.
   */
  id: number;

  /**
   * Main title.
   */
  title: string;

  /**
   * Original/official title.
   */
  originalName: string | null;

  /**
   * Date of the first release. Can be in 'yyyy', 'TBA', 'yyyy-mm', 'yyyy-mm-dd' formats.
   */
  releasedDate: string;

  /**
   * Visual novel languages.
   */
  languages: Language[];

  /**
   * Platform where visual novel was released.
   */
  platforms: Platform[];

  /**
   * Release type.
   */
  type: ReleaseType;

  /**
   * Patch flag.
   */
  isPatch: boolean;

  /**
   * Freeware flag.
   */
  isFreeware: boolean;

  /**
   * Doujin flag.
   */
  isDoujin: boolean;

  /**
   * Official website url.
   */
  website: string | null;

  /**
   * Random notes.
   */
  notes: string | null;

  /**
   * Age rating.
   */
  ageRating: string;

  /**
   * AN/UPC/EAN code. This is actually an integer, but formatted as a string to avoid an overflow on 32bit platforms.
   */
  gtin: string | null;

  /**
   * Catalog number.
   */
  catalog: string | null;

  /**
   * Media.
   */
  media: ReleaseMedia[];

  /**
   * Resolution.
   */
  resolution: string | null;

  /**
   * Voiced release.
   * 1 = Not voiced,
   * 2 = Only ero scenes voiced,
   * 3 = Partially voiced,
   * 4 = Fully voiced.
   */
  voiced: ReleaseVoiceStatus | null;

  /**
   * Animation status.
   */
  animation: ReleaseAnimation;

  /**
   * Visual novels linked to this release.
   */
  visualNovels: VisualNovel[];

  /**
   * Producers involved into release.
   */
  producers: ReleaseProducer[];
}

import { ReleaseType, ReleaseVoiced } from '../../utils/types/releaseHelperTypes';
import { VisualNovelDto } from './visualNovelDto';

/**
 * Represents producer involved into release.
 */
export interface ReleaseProducerDto {

  /**
   * Producer id.
   */
  id: number;

  /**
   * Is developer.
   */
  developer: boolean;

  /**
   * Is publisher.
   */
  publisher: boolean;

  /**
   * Producer name(romaji).
   */
  name: string;

  /**
   * Name in original.
   */
  original: string | null;

  /**
   * Type.
   */
  type: string;
}

/**
 * Represents release media.
 */
export interface ReleaseMediaDto {

  /**
   * Medium.
   */
  medium: string;

  /**
   * Quantity.
   */
  qty: number;
}

/**
 * Represents release.
 */
export interface ReleaseDto {

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
  original: string | null;

  /**
   * Date of the first release.
   */
  released: string | null;

  /**
   * Visual novel languages.
   */
  languages: string[];

  /**
   * Platform where visual novel was released.
   */
  platforms: string[];

  /**
   * Release type.
   */
  type: ReleaseType;

  /**
   * Patch flag.
   */
  patch: boolean;

  /**
   * Freeware flag.
   */
  freeware: boolean;

  /**
   * Doujin flag.
   */
  doujin: boolean;

  /**
   * Official website url.
   */
  website: string | null;

  /**
   * Random notes.
   */
  notes: string | null;

  /**
   * Age rating, 0 = all ages.
   */
  minage: number | null;

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
  media: ReleaseMediaDto[];

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
  voiced: ReleaseVoiced | null;

  /**
   * The array has two integer members,
   * the first one indicating the story animations,
   * the second the ero scene animations.
   * Both members can be null if unknown or not applicable.
   * When not null, the number indicates the following:
   * 1 = No animations,
   * 2 = Simple animations,
   * 3 = Some fully animated scenes,
   * 4 = All scenes fully animated.
   */
  animation: [number | null, number | null];

  /**
   * Visual novels linked to this release.
   */
  vn: VisualNovelDto[];

  /**
   * Producers involved into release.
   */
  producers: ReleaseProducerDto[];
}

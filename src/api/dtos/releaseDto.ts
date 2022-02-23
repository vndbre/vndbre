export enum ReleaseTypeDto {
  Complete = 'complete',
  Partial = 'partial',
  Trial = 'trial',
}

export enum ReleaseVoiceStatusDto {
  NotVoiced = 1,
  EroVoiced,
  PartiallyVoiced,
  FullyVoiced,
}

/**
 * Represents producer involved into release.
 */
export interface ReleaseProducerDto {

  /**
   * Producer id.
   */
  readonly id: number;

  /**
   * Is developer.
   */
  readonly developer: boolean;

  /**
   * Is publisher.
   */
  readonly publisher: boolean;

  /**
   * Producer name(romaji).
   */
  readonly name: string;

  /**
   * Name in original.
   */
  readonly original: string | null;

  /**
   * Type.
   */
  readonly type: string;
}

/**
 * Represents release media.
 */
export interface ReleaseMediaDto {

  /**
   * Medium.
   */
  readonly medium: string;

  /**
   * Quantity.
   */
  readonly qty: number;
}

/**
 * Represents novel related to release.
 */
export interface ReleaseNovelDto {

  /** Novel id. */
  readonly id: number;

  /** Original name of the novel. */
  readonly original: string | null;

  /** Release type. */
  readonly rtype: ReleaseTypeDto;

  /** Novel title. */
  readonly title: string;
}

/**
 * Represents release.
 */
export interface ReleaseDto {

  /**
   * Visual novel ID.
   */
  readonly id: number;

  /**
   * Main title.
   */
  readonly title: string;

  /**
   * Original/official title.
   */
  readonly original: string | null;

  /**
   * Date of the first release.
   */
  readonly released: string | null;

  /**
   * Visual novel languages.
   */
  readonly languages: readonly string[];

  /**
   * Platform where visual novel was released.
   */
  readonly platforms: readonly string[];

  /**
   * Release type.
   */
  readonly type: ReleaseTypeDto;

  /**
   * Patch flag.
   */
  readonly patch: boolean;

  /**
   * Freeware flag.
   */
  readonly freeware: boolean;

  /**
   * Doujin flag.
   */
  readonly doujin: boolean;

  /**
   * Official website url.
   */
  readonly website: string | null;

  /**
   * Random notes.
   */
  readonly notes: string | null;

  /**
   * Age rating, 0 = all ages.
   */
  readonly minage: number | null;

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
  readonly media: readonly ReleaseMediaDto[];

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
  readonly voiced: ReleaseVoiceStatusDto | null;

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
  readonly animation: [number | null, number | null];

  /**
   * Visual novels linked to this release.
   */
  readonly vn?: readonly ReleaseNovelDto[];

  /**
   * Producers involved into release.
   */
  readonly producers: readonly ReleaseProducerDto[];
}

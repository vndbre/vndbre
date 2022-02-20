import { ImageFlaggingDto } from './imageFlaggingDto';
import { VisualNovelLinks } from '../../utils/types/visualNovelLinks';
import { VisualNovelLength } from '../../utils/types/visualNovelLength';

/**
 * Represents visual novel screenshot.
 */
export interface VisualNovelScreenshotDto {

  /**
   * URL of the full-size screenshot.
   */
  readonly image: string;

  /**
   * Release ID.
   */
  readonly rid: number;

  /**
   * NSFW flag.
   */
  readonly nsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  readonly flagging: ImageFlaggingDto | null;

  /**
   * Height of the full-size screenshot.
   */
  readonly height: number;

  /**
   * Width of the full-size screenshot.
   */
  readonly width: number;
}

/**
 * Represents visual novel staff.
 */
export interface VisualNovelStaffDto {

  /**
   * Staff id.
   */
  readonly sid: number;

  /**
   * Alias id.
   */
  readonly aid: number;

  /**
   * Staff member name.
   */
  readonly name: string;

  /**
   * Original staff member name.
   */
  readonly original: string | null;

  /**
   * Staff member role.
   */
  readonly role: string;

  /**
   * Additional notes.
   */
  readonly note: string | null;
}

/**
 * Represents related visual novel.
 */

/**
 * Represents anime related to the VN.
 */
export interface VisualNovelRelatedAnimeDto {

  /**
   * AniDB ID.
   */
  readonly id: number;

  /**
   * AnimeNewsNetwork ID.
   */
  readonly ann_id: number | null;

  /**
   * AnimeNfo ID.
   */
  readonly nfo_id: string | null;

  /**
   * Title in romaji.
   */
  readonly title_romaji: string | null;

  /**
   * Title in kanji.
   */
  readonly title_kanji: string | null;

  /**
   * Year in which the anime was aired.
   */
  readonly year: number | null;

  /**
   * Anime type.
   */
  readonly type: string | null;
}

/**
 * Represents related visual novel to the current VN.
 */
export interface VisualNovelRelatedDto {

  /**
   * VN id.
   */
  readonly id: number;

  /**
   * Relation to the VN.
   */
  readonly relation: string;

  /**
   * VN title (romaji).
   */
  readonly title: string;

  /**
   * Original/official title.
   */
  readonly original: string | null;

  /**
   * Shows if a novel is original.
   */
  readonly official: boolean;
}

/**
 * Represents visual novel dto.
 */
export interface VisualNovelDto {

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
   * Original language of the VN. Always contains a single language.
   */
  readonly orig_lang: readonly string[];

  /**
   * Platform where visual novel was released.
   */
  readonly platforms: readonly string[];

  /**
   * Aliases, separated by newlines.
   */
  readonly aliases: string | null;

  /**
   * Length of the game, 1-5.
   */
  readonly length: VisualNovelLength | null;

  /**
   * Description of the VN.
   */
  readonly description: string | null;

  /**
   * Links to related data.
   */
  readonly links: VisualNovelLinks;

  /**
   * HTTP link to the VN image.
   */
  readonly image: string | null;

  /**
   * Whether the VN image is flagged as NSFW or not.
   */
  readonly image_nsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  readonly image_flagging: ImageFlaggingDto | null;

  /**
   * Anime related to the VN.
   */
  readonly anime: readonly VisualNovelRelatedAnimeDto[];

  /**
   * Related visual novels to the VN.
   */
  readonly relations: readonly VisualNovelRelatedDto[];

  /**
   * (Possibly empty) list of tags linked to this VN. Each tag is represented as an array with three elements:
   * tag id (integer),
   * score (number between 0 and 3),
   * spoiler level (integer, 0=none, 1=minor, 2=major).
   * Only tags with a positive score are included.
   * Note that this list may be relatively large - more than 50 tags for a VN is quite possible.
   * General information for each tag is available in the tags dump.
   * Keep in mind that it is possible that a tag has only recently been added and is not available in the dump yet,
   * though this doesn't happen often.
   */
  readonly tags: readonly number[][];

  /**
   * Between 0 (unpopular) and 100 (most popular).
   */
  readonly popularity: number;

  /**
   * Bayesian rating, between 1 and 10.
   */
  readonly rating: number;

  /**
   * Number of votes.
   */
  readonly votecount: number;

  /**
   * VN screenshots.
   */
  readonly screens: readonly VisualNovelScreenshotDto[];

  /**
   * Staff related to the VN.
   */
  readonly staff: readonly VisualNovelStaffDto[];
}

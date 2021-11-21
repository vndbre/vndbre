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
  image: string;

  /**
   * Release ID.
   */
  rid: number;

  /**
   * NSFW flag.
   */
  nsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  flagging: ImageFlaggingDto | null;

  /**
   * Height of the full-size screenshot.
   */
  height: number;

  /**
   * Width of the full-size screenshot.
   */
  width: number;
}

/**
 * Represents visual novel staff.
 */
export interface VisualNovelStaffDto {

  /**
   * Staff id.
   */
  sid: number;

  /**
   * Alias id.
   */
  aid: number;

  /**
   * Staff member name.
   */
  name: string;

  /**
   * Original staff member name.
   */
  original: string | null;

  /**
   * Staff member role.
   */
  role: string;

  /**
   * Additional notes.
   */
  note: string | null;
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
  id: number;

  /**
   * AnimeNewsNetwork ID.
   */
  ann_id: number | null;

  /**
   * AnimeNfo ID.
   */
  nfo_id: string | null;

  /**
   * Title in romaji.
   */
  title_romaji: string | null;

  /**
   * Title in kanji.
   */
  title_kanji: string | null;

  /**
   * Year in which the anime was aired.
   */
  year: number | null;

  /**
   * Anime type.
   */
  type: string | null;
}

/**
 * Represents related visual novel to the current VN.
 */
export interface VisualNovelRelatedDto {

  /**
   * VN id.
   */
  id: number;

  /**
   * Relation to the VN.
   */
  relation: string;

  /**
   * VN title (romaji).
   */
  title: string;

  /**
   * Original/official title.
   */
  original: string | null;

  /**
   * Shows if a novel is original.
   */
  official: boolean;
}

/**
 * Represents visual novel dto.
 */
export interface VisualNovelDto {

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
   * Original language of the VN. Always contains a single language.
   */
  orig_lang: string[];

  /**
   * Platform where visual novel was released.
   */
  platforms: string[];

  /**
   * Aliases, separated by newlines.
   */
  aliases: string | null;

  /**
   * Length of the game, 1-5.
   */
  length: VisualNovelLength | null;

  /**
   * Description of the VN.
   */
  description: string | null;

  /**
   * Links to related data.
   */
  links: VisualNovelLinks;

  /**
   * HTTP link to the VN image.
   */
  image: string | null;

  /**
   * Whether the VN image is flagged as NSFW or not.
   */
  image_nsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  image_flagging: ImageFlaggingDto | null;

  /**
   * Anime related to the VN.
   */
  anime: VisualNovelRelatedAnimeDto[];

  /**
   * Related visual novels to the VN.
   */
  relations: VisualNovelRelatedDto[];

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
  tags: number[][];

  /**
   * Between 0 (unpopular) and 100 (most popular).
   */
  popularity: number;

  /**
   * Bayesian rating, between 1 and 10.
   */
  rating: number;

  /**
   * Number of votes.
   */
  votecount: number;

  /**
   * VN screenshots.
   */
  screens: VisualNovelScreenshotDto[];

  /**
   * Staff related to the VN.
   */
  staff: VisualNovelStaffDto[];
}

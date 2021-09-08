import { RelatedVisualNovel, VisualNovelScreenshot, VisualNovelStaff } from '../api/dtos/ visualNovelDto';
import { VisualNovelLinks } from '../utils/types/visualNovelLinks';
import { ImageFlagging } from './imageFlagging';
import { RelatedAnime } from './relatedAnime';

/**
 * Represents VN tag.
 */
export interface VisualNovelTag {

  /**
   * Tag id.
   */
  id: number;

  /**
   * Tag score (between 1 and 3).
   */
  score: number;

  /**
   * Spoiler level (integer, 0=none, 1=minor, 2=major).
   */
  spoilerLevel: number;
}

/**
 * Represents visual model.
 */
export interface VisualNovel {

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
  released: Date | null;

  /**
   * Visual novel languages.
   */
  languages: string[];

  /**
   * Original language of the VN. Always contains a single language.
   */
  originalLanguage: string[];

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
  length: number | null;

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
  imageNsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  imageFlagging: ImageFlagging | null;

  /**
   * Anime related to the VN.
   */
  anime: RelatedAnime[];

  /**
   * Related visual novels to the VN.
   */
  relations: RelatedVisualNovel[];

  /**
   * Tags linked to this VN. Each tag is represented as an array with three elements:
   * Only tags with a positive score are included.
   */
  tags: VisualNovelTag[];

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
  screens: VisualNovelScreenshot[];

  /**
   * Staff related to the VN.
   */
  staff: VisualNovelStaff[];
}

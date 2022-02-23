import { SpoilerLevel } from '../utils/types/spoilerLevel';
import { StaffRoles } from '../utils/types/staffRoles';
import { DisplayVisualNovelLength } from '../utils/types/visualNovelLength';
import { VisualNovelLinks } from '../utils/types/visualNovelLinks';
import { ImageFlagging } from './imageFlagging';

/** Represents visual novel relation type. */
export enum RelationType {
  Alternative = 'alternative',
  SharesCharacters = 'shares characters',
  Prequel = 'prequel',
  SideStory = 'side story',
  SameSetting = 'same setting',
  FanDisc = 'fandisc',
  Sequel = 'sequel',
  SameSeries = 'same series',
  ParentStory = 'parent story',
}

/**
 * Represents anime related to the VN.
 */
export interface VisualNovelRelatedAnime {

  /**
   * AniDB ID.
   */
  readonly id: number;

  /**
   * AnimeNewsNetwork ID.
   */
  readonly annId: number | null;

  /**
   * AnimeNfo ID.
   */
  readonly nfoId: string | null;

  /**
   * Title in romaji.
   */
  readonly titleRomaji: string | null;

  /**
   * Title in kanji.
   */
  readonly titleKanji: string | null;

  /**
   * Date when the anime was aired.
   */
  readonly year: Date | null;

  /**
   * Anime type.
   */
  readonly type: string | null;
}

/**
 * Represents visual novel screenshot.
 */
export interface VisualNovelScreenshot {

  /**
   * URL of the full-size screenshot.
   */
  readonly image: string;

  /**
   * Release ID.
   */
  readonly releaseId: number;

  /**
   * NSFW flag.
   */
  readonly isNsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  readonly flagging: ImageFlagging | null;

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
 * Represents related visual novel.
 */
export interface VisualNovelRelated {

  /**
   * VN id.
   */
  readonly id: number;

  /**
   * Relation to the VN.
   */
  readonly relation: RelationType;

  /**
   * VN title (romaji).
   */
  readonly title: string;

  /**
   * Original/official title.
   */
  readonly originalName: string | null;

  /**
   * Shows if a novel is original.
   */
  readonly isOfficial: boolean;
}

/**
 * Represents visual novel staff.
 */
export interface VisualNovelStaff {

  /**
   * Staff id.
   */
  readonly staffId: number;

  /**
   * Alias id.
   */
  readonly aliasId: number;

  /**
   * Staff member name.
   */
  readonly name: string;

  /**
   * Original staff member name.
   */
  readonly originalName: string | null;

  /**
   * Staff member role.
   */
  readonly role: StaffRoles;

  /**
   * Additional notes.
   */
  readonly note: string | null;
}

/**
 * Represents VN tag.
 */
export interface VisualNovelTag {

  /**
   * Tag id.
   */
  readonly id: number;

  /**
   * Tag score (between 1 and 3).
   */
  readonly score: number;

  /**
   * Spoiler level (integer, 0=none, 1=minor, 2=major).
   */
  readonly spoilerLevel: SpoilerLevel;
}

/**
 * Represents visual model.
 */
export interface VisualNovel {

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
  readonly originalName: string | null;

  /**
   * Date of the first release.
   */
  readonly released: Date | null;

  /**
   * Visual novel languages.
   */
  readonly languages: readonly string[];

  /**
   * Original language of the VN. Always contains a single language.
   */
  readonly originalLanguage: readonly string[];

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
  readonly length: DisplayVisualNovelLength | null;

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
  readonly isImageNsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  readonly imageFlagging: ImageFlagging | null;

  /**
   * Anime related to the VN.
   */
  readonly anime: readonly VisualNovelRelatedAnime[];

  /**
   * Related visual novels to the VN.
   */
  readonly relations: readonly VisualNovelRelated[];

  /**
   * Tags linked to this VN. Each tag is represented as an array with three elements:
   * Only tags with a positive score are included.
   */
  readonly tags: readonly VisualNovelTag[];

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
  readonly voteCount: number;

  /**
   * VN screenshots.
   */
  readonly screens: readonly VisualNovelScreenshot[];

  /**
   * Staff related to the VN.
   */
  readonly staff: readonly VisualNovelStaff[];
}

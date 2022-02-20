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
  id: number;

  /**
   * AnimeNewsNetwork ID.
   */
  annId: number | null;

  /**
   * AnimeNfo ID.
   */
  nfoId: string | null;

  /**
   * Title in romaji.
   */
  titleRomaji: string | null;

  /**
   * Title in kanji.
   */
  titleKanji: string | null;

  /**
   * Date when the anime was aired.
   */
  year: Date | null;

  /**
   * Anime type.
   */
  type: string | null;
}

/**
 * Represents visual novel screenshot.
 */
export interface VisualNovelScreenshot {

  /**
   * URL of the full-size screenshot.
   */
  image: string;

  /**
   * Release ID.
   */
  releaseId: number;

  /**
   * NSFW flag.
   */
  isNsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  flagging: ImageFlagging | null;

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
 * Represents related visual novel.
 */
export interface VisualNovelRelated {

  /**
   * VN id.
   */
  id: number;

  /**
   * Relation to the VN.
   */
  relation: RelationType;

  /**
   * VN title (romaji).
   */
  title: string;

  /**
   * Original/official title.
   */
  originalName: string | null;

  /**
   * Shows if a novel is original.
   */
  isOfficial: boolean;
}

/**
 * Represents visual novel staff.
 */
export interface VisualNovelStaff {

  /**
   * Staff id.
   */
  staffId: number;

  /**
   * Alias id.
   */
  aliasId: number;

  /**
   * Staff member name.
   */
  name: string;

  /**
   * Original staff member name.
   */
  originalName: string | null;

  /**
   * Staff member role.
   */
  role: StaffRoles;

  /**
   * Additional notes.
   */
  note: string | null;
}

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
  spoilerLevel: SpoilerLevel;
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
  originalName: string | null;

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
  length: DisplayVisualNovelLength | null;

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
  isImageNsfw: boolean;

  /**
   * Image flagging summary of the main VN image.
   */
  imageFlagging: ImageFlagging | null;

  /**
   * Anime related to the VN.
   */
  anime: VisualNovelRelatedAnime[];

  /**
   * Related visual novels to the VN.
   */
  relations: VisualNovelRelated[];

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
  voteCount: number;

  /**
   * VN screenshots.
   */
  screens: VisualNovelScreenshot[];

  /**
   * Staff related to the VN.
   */
  staff: VisualNovelStaff[];
}

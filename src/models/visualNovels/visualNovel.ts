import { ImageFlagging } from '../imageFlagging';
import { Language } from '../language';
import { Platform } from '../platform';
import { ReadableVisualNovelLength } from './visualNovelLength';
import { VisualNovelLinks } from './visualNovelLinks';
import { VisualNovelRelated } from './visualNovelRelated';
import { VisualNovelRelatedAnime } from './visualNovelRelatedAnime';
import { VisualNovelRelation } from './visualNovelRelation';
import { VisualNovelScreenshot } from './visualNovelScreenshot';
import { VisualNovelStaff } from './visualNovelStaff';
import { VisualNovelTag } from './visualNovelTag';

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
  readonly languages: readonly Language[];

  /**
   * Original language of the VN. Always contains a single language.
   */
  readonly originalLanguage: readonly Language[];

  /**
   * Platform where visual novel was released.
   */
  readonly platforms: readonly Platform[];

  /**
   * Aliases, separated by newlines.
   */
  readonly aliases: string | null;

  /**
   * Length of the game, 1-5.
   */
  readonly length: ReadableVisualNovelLength | null;

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

export namespace VisualNovel {

  /**
   * Obtains information about visual novel related to given novel.
   * @param novel Source visual novel.
   * @param relatedNovelId Id of the related novel.
   */
  export function getRelationData(novel: VisualNovel, relatedNovelId: VisualNovel['id']): VisualNovelRelation.RelationInfo {
    const relationData = novel.relations.find(relation => relation.id === relatedNovelId);
    return { relationType: relationData?.relation ?? VisualNovelRelation.SharesCharacters, isOfficial: relationData?.isOfficial ?? false };
  }
}

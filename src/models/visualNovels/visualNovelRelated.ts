import { VisualNovelRelation } from './visualNovelRelation';

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
  readonly relation: VisualNovelRelation;

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

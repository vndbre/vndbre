import { SpoilerLevel } from '../spoilerLevel';

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

import { ImageFlagging } from '../imageFlagging';

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

import { ReleaseAnimationType } from './releaseAnimationType';

/**
 * Represents animation quality.
 */
export interface ReleaseAnimation {

  /**
   * Story scenes animation.
   */
  readonly storyAnimation: ReleaseAnimationType | null;

  /**
   * Ero scenes animation.
   */
  readonly eroAnimation: ReleaseAnimationType | null;
}

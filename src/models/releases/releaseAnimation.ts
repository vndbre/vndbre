import { ReleaseAnimationType } from './releaseAnimationType';

/**
 * Represents animation quality.
 */
export interface ReleaseAnimation {

  /**
   * Story scenes animation.
   */
  storyAnimation: ReleaseAnimationType | null;

  /**
   * Ero scenes animation.
   */
  eroAnimation: ReleaseAnimationType | null;
}

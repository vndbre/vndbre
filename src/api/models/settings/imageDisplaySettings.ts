import type { ImageDisplayLevel } from '../imageDisplayLevel';

/** Settings for image displaying. */
export interface ImageDisplaySettings {

  /** Acceptable violence level. */
  readonly violenceLevel: ImageDisplayLevel;

  /** Acceptable sexual level. */
  readonly sexualLevel: ImageDisplayLevel;
}

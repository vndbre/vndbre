import type { SpoilerLevel } from '../spoilerLevel';
import type { ImageDisplaySettings } from './imageDisplaySettings';

/** Display settings. */
export interface Settings {

  /** Spoiler level. */
  readonly spoilerLevel: SpoilerLevel;

  /** Settings for image displaying. */
  readonly imageDisplaySettings: ImageDisplaySettings;

  /** Hides sexual tags and traits. */
  readonly hideSexualTags: boolean;
}

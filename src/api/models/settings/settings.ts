import type { SpoilerLevel } from '../spoilerLevel';
import type { ImageDisplaySettings } from './imageDisplaySettings';

export interface Settings {
  readonly spoilerLevel: SpoilerLevel;
  readonly imageDisplaySettings: ImageDisplaySettings;
  readonly hideSexualTags: boolean;
}

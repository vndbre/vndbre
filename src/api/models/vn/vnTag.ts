import type { SpoilerLevel } from '../spoilerLevel';
import type { Tag } from '../tag/tag';

/** Tag for vn. */
export interface VnTag extends Tag {

  /** Tag spoiler level. */
  readonly spoilerLevel: SpoilerLevel;
}
